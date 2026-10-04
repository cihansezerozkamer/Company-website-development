"""Extract product card photos and PDF page previews from the supplied brochures.

Run from the repository root with Python and PyMuPDF installed.
Source documents are kept unchanged; generated PNGs are used by data.js.
"""
from pathlib import Path
import zipfile
import pymupdf as fitz

ROOT = Path(__file__).resolve().parents[1] / 'assets/images/products'
THUMBNAILS = ROOT / 'thumbnails'
PREVIEWS = ROOT / 'documents'


def thumbnail(data, target):
    pix = fitz.Pixmap(data)
    if pix.colorspace.n != 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    # Remove empty margins from supplier PNGs without cropping the product.
    samples, channels = pix.samples, pix.n
    left, top, right, bottom = pix.width, pix.height, 0, 0
    for y in range(pix.height):
        for x in range(pix.width):
            i = (y * pix.width + x) * channels
            visible = min(samples[i:i+3]) < 245 and (not pix.alpha or samples[i + channels - 1] > 16)
            if visible:
                left, top = min(left, x), min(top, y)
                right, bottom = max(right, x+1), max(bottom, y+1)
    if right <= left or bottom <= top:
        raise ValueError(f'Empty product image: {target}')
    margin = max(4, round(max(right-left, bottom-top) * .025))
    clip = fitz.Rect(max(0, left-margin), max(0, top-margin), min(pix.width, right+margin), min(pix.height, bottom+margin))
    doc = fitz.open()
    page = doc.new_page(width=pix.width, height=pix.height)
    page.insert_image(page.rect, stream=data)
    scale = min(1, 640 / max(clip.width, clip.height))
    page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=clip, alpha=True).save(target)
    doc.close()


def build():
    THUMBNAILS.mkdir(parents=True, exist_ok=True)
    PREVIEWS.mkdir(parents=True, exist_ok=True)
    thumbnail((ROOT / 'LİNE İNT-MYTEC-1.png').read_bytes(), THUMBNAILS / 'line-interactive-ups.png')
    sources = [
        ('ASANSO*UPS.docx', 'word/media/image2.png', 'asansor-ups'),
        ('RACK-TOWER 1-2-3 KVA..docx', 'word/media/image2.png', 'rack-mount-1-2-3-kva'),
        ('RACK-TOWER 6-10 KVA. - Cosq1.docx', 'word/media/image3.png', 'rack-tower-6-10-kva'),
        ('6-10 KVA..docx', 'word/media/image2.png', '6-10-kva'),
    ]
    for pattern, member, name in sources:
        source, = ROOT.glob(pattern)
        with zipfile.ZipFile(source) as archive:
            thumbnail(archive.read(member), THUMBNAILS / f'{name}.png')
    for filename, name in [
        ('N_SERISI_10-20_kVA_Urun_Brosuru.pdf', '10-20-kva'),
        ('BTR_SERISI_10-120_kVA_Urun_Brosuru.pdf', '10-120-kva'),
        ('BTR_SERISI_160-800_kVA_Urun_Brosuru.pdf', '160-800-kva'),
    ]:
        with fitz.open(ROOT / filename) as doc:
            # The first landscape image is the brochure's product photograph.
            photo = next(image for image in doc[0].get_images() if image[2] > image[3])
            thumbnail(doc.extract_image(photo[0])['image'], THUMBNAILS / f'{name}.png')
            for i, page in enumerate(doc):
                page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8)).save(PREVIEWS / f'{name}-{i+1}.png')
    print('Built 8 product thumbnails and 6 PDF page previews.')


if __name__ == '__main__':
    build()

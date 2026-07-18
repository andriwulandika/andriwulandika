#!/usr/bin/env python3
"""sync-partials.py — Regenerate nav/footer blocks in target HTML files from
shared/partials/, so those blocks have a single source of truth for editing.

Safety model: this is a no-op by default. For each (partial, tag, targets)
entry, the script only writes a file if the target's current <tag>...</tag>
block already matches the partial byte-for-byte (idempotent regeneration) OR
--force is passed. It never silently overwrites a target whose block has
drifted from the partial — it aborts and reports the mismatch instead, so a
page that was intentionally customized is never clobbered by accident.

Run after editing a file in shared/partials/, or as a periodic consistency
check (default, no changes) before committing.
"""
import re
import sys

PARTIALS_DIR = "shared/partials"

# (partial file, tag, [target files])
GROUPS = [
    ("nav-article.html", "nav", [
        "tools/berita-acara-rapat.html",
        "tools/cascading-perencanaan-daerah.html",
        "tools/menyusun-kak-tor.html",
        "tools/nota-dinas-vs-telaahan-staf.html",
        "tools/indikator-kinerja-utama-smart.html",
        "tools/kesalahan-umum-dokumen-perencanaan.html",
        "tools/rkpd-dan-perubahan-rkpd.html",
        "tools/sakip-dari-pk-hingga-lkjip.html",
    ]),
    ("footer-article.html", "footer", [
        "tools/berita-acara-rapat.html",
        "tools/cascading-perencanaan-daerah.html",
        "tools/menyusun-kak-tor.html",
        "tools/nota-dinas-vs-telaahan-staf.html",
        "tools/indikator-kinerja-utama-smart.html",
        "tools/kesalahan-umum-dokumen-perencanaan.html",
        "tools/rkpd-dan-perubahan-rkpd.html",
    ]),
    ("nav-sitool-minimal.html", "nav", [
        "tools/sibacara.html",
        "tools/sitelaah.html",
    ]),
    ("footer-panduan.html", "footer", [
        "tools/cara-pakai-template-dokumen.html",
        "tools/renja-opd-panduan-lengkap.html",
    ]),
]


def find_block(html, tag):
    m = re.search(rf"<{tag}[^>]*>.*?</{tag}>", html, re.DOTALL)
    return m


def main():
    force = "--force" in sys.argv
    changed = 0
    mismatches = []

    for partial_name, tag, targets in GROUPS:
        partial_path = f"{PARTIALS_DIR}/{partial_name}"
        with open(partial_path, encoding="utf-8") as f:
            partial_content = f.read()

        for target in targets:
            with open(target, encoding="utf-8") as f:
                html = f.read()
            m = find_block(html, tag)
            if not m:
                mismatches.append((target, tag, "blok tidak ditemukan"))
                continue
            current = m.group(0)
            if current == partial_content:
                continue  # already in sync, no write needed
            if not force:
                mismatches.append((target, tag, "berbeda dari partial (mungkin sudah disesuaikan manual)"))
                continue
            new_html = html[: m.start()] + partial_content + html[m.end():]
            with open(target, "w", encoding="utf-8") as f:
                f.write(new_html)
            changed += 1
            print(f"UPDATED  {target} ({tag})")

    if mismatches:
        print("\nTidak diubah (butuh --force untuk menimpa), periksa manual:")
        for target, tag, reason in mismatches:
            print(f"  {target} [{tag}]: {reason}")

    print(f"\n{changed} file diperbarui, {len(mismatches)} butuh perhatian manual, sisanya sudah sinkron.")
    return 1 if mismatches and force else 0


if __name__ == "__main__":
    sys.exit(main())

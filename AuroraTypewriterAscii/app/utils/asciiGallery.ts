export interface AsciiGalleryItem {
  name: string
  /** filename under public/img/gallery/ascii_img/ */
  asciiFile: string
  /** filename under public/img/gallery/raster_img/ */
  thumbnail: string
}

/**
 * Best-effort pairing of each pre-rendered ASCII art with the raster image
 * it was generated from — there is no metadata inside the .txt files
 * themselves, so this manifest is the source of truth for the library
 * picker in ImageSelect.vue.
 */
export const asciiGalleryItems: AsciiGalleryItem[] = [
  { name: 'Cat', asciiFile: 'catFace.txt', thumbnail: 'catFace.jpg' },
  { name: 'Amanda', asciiFile: 'amanda.txt', thumbnail: 'amanda.jpg' },
  { name: 'Steve', asciiFile: 'steve.txt', thumbnail: 'steve.jpg' },
  { name: 'Me', asciiFile: 'me.txt', thumbnail: 'meQ.png' },
]

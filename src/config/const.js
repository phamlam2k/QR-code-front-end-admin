export const API_IMAGE = "https://api.cloudinary.com/v1_1/rikkeisoft/image/upload"

export const ROLE_ADMIN = 0
export const ROLE_TEACHER = 1

export const QUILL_CONFIG = {
    modules: {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    },
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    formats: [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        // "video",
    ],
}
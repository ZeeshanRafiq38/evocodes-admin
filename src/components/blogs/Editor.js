import Axios, { baseURL } from "config/api";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";


const Editor = ({ content , setContent }) => {
    const { user } = useSelector(state => state.auth)

    const quill = useRef();

    const imageHandler = useCallback(() => {
        // Create an input element of type 'file'
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        // When a file is selected
        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image' , file);
            try {
                const response = await Axios.post('/blog/upload-image', formData);
                const url  = baseURL + response?.data?.data?.url;
                const quillEditor = quill.current.getEditor();
                const range = quillEditor.getSelection(true);
                quillEditor.insertEmbed(range.index, "image", url, "user");
            } catch (error) {
                console.error('Image upload error:', error);
            }
        };
    }, []);

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    ['link', 'image'],
                    ['clean']
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            clipboard: {
                matchVisual: true,
            },
        }),
        [imageHandler]
    );

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "clean",
    ];


    return (
        <div className={'relative flex flex-col gap-2'}>
            <label className="label">
                Content
            </label>
            <QuillEditor
                ref={(el) => (quill.current = el)}
                theme="snow"
                className="!h-full"
                value={content}
                formats={formats}
                modules={modules}
                onChange={(value) => setContent(value)}
            />
        </div>
    );
};

export default memo(Editor);
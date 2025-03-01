import React, { useState, useEffect } from 'react';
import '../App.css';

const Editor = () => {
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        // Load content from cache on page load
        loadFromCache();

        // Save content to cache every 2 seconds
        const interval = setInterval(saveToCache, 2000);

        // Cleanup function to clear interval
        return () => clearInterval(interval);
    }, []);

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        saveToCache();
    };

    const clearFormatting = () => {
        document.execCommand('removeFormat', false, null);
        saveToCache();
    };

    const saveToCache = () => {
        const content = document.getElementById('editor-container').innerHTML;
        localStorage.setItem('editorContent', content);
    };

    const loadFromCache = () => {
        const content = localStorage.getItem('editorContent');
        if (content) {
            document.getElementById('editor-container').innerHTML = content;
        }
    };

    const handleImageUpload = () => {
        const fileInput = document.getElementById('image-upload');
        fileInput.click(); // Trigger the file input
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; height: auto;">`;
                document.execCommand('insertHTML', false, img);
                saveToCache();
            };
            reader.readAsDataURL(file);
        }
    };

    const saveAsDocx = () => {
        const filename = document.getElementById('filename-input').value || 'document';
        const content = document.getElementById('editor-container').innerHTML;

        // Create a new Blob object with the content
        const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        // Create a temporary link element to trigger the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${filename}.docx`;

        // Append the link to the body and trigger the download
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    };

    // Define toggleMark function
    const toggleMark = (markType) => execCommand('toggleMark', markType.name);

    // Define setBlockType function
    const setBlockType = (nodeType) => execCommand('setBlockType', nodeType.name);

    // Define heading function
    const heading = (level) => setBlockType('heading', { level });

    // Define wrapIn function
    const wrapIn = (nodeType) => execCommand('wrapIn', nodeType.name);

    // Define undo function
    const undo = () => execCommand('undo');

    // Define redo function
    const redo = () => execCommand('redo');

    // Define createCustomIcon function
    const createCustomIcon = (command, iconClass, alt) => {
        const img = document.createElement('img');
        img.src = `https://www.editpad.org/web_assets/frontend/images/prose-mirror-icons/${command}-icon.svg?v1.2`;
        img.alt = alt;
        img.className = iconClass;
        img.addEventListener('click', () => execCommand(command));
        return img;
    };

    // Menu Plugin Logic
    const menuPlugin = (items) => {
        return {
            view(editorView) {
                const menuBar = document.createElement('div');
                menuBar.className = 'custom__menubar ql-toolbar';

                items.forEach((item) => {
                    let dom;
                    if (item.command === toggleMark) {
                        dom = createCustomIcon('b', 'bold-icon', 'bold');
                    } else if (item.command === setBlockType) {
                        dom = createCustomIcon('p', 'paragraph-icon', 'paragraph');
                    } else if (item.command === heading) {
                        dom = createCustomIcon(`H${item.level}`, `heading-${item.level}`, `heading ${item.level}`);
                    } else if (item.command === wrapIn) {
                        dom = createCustomIcon('bullet_list', 'bullet-list-icon', 'bullet list');
                    } else if (item.command === wrapIn) {
                        dom = createCustomIcon('number_list', 'number-list-icon', 'numbered list');
                    } else if (item.command === undo) {
                        dom = createCustomIcon('Undo', 'undo-icon', 'undo');
                    } else if (item.command === redo) {
                        dom = createCustomIcon('Redo', 'redo-icon', 'redo');
                    }
                    menuBar.appendChild(dom);
                });

                editorView.dom.parentNode.insertBefore(menuBar, editorView.dom);
                return menuBar;
            }
        };
    };

    const menu = menuPlugin([
        { command: toggleMark, dom: createCustomIcon('b', 'bold-icon', 'bold') },
        { command: toggleMark, dom: createCustomIcon('i', 'italic-icon', 'italic') },
        { command: setBlockType, dom: createCustomIcon('p', 'paragraph-icon', 'paragraph') },
        { command: heading(1), dom: createCustomIcon('heading1', 'heading1-icon', 'heading 1') },
        { command: heading(2), dom: createCustomIcon('heading2', 'heading2-icon', 'heading 2') },
        { command: heading(3), dom: createCustomIcon('heading3', 'heading3-icon', 'heading 3') },
        { command: heading(4), dom: createCustomIcon('heading4', 'heading4-icon', 'heading 4') },
        { command: heading(5), dom: createCustomIcon('heading5', 'heading5-icon', 'heading 5') },
        { command: heading(6), dom: createCustomIcon('heading6', 'heading6-icon', 'heading 6') },
        { command: wrapIn, dom: createCustomIcon('bullet_list', 'bullet-list-icon', 'bullet list') },
        { command: wrapIn, dom: createCustomIcon('number_list', 'number-list-icon', 'numbered list') },
        { command: undo, dom: createCustomIcon('Undo', 'undo-icon', 'undo') },
        { command: redo, dom: createCustomIcon('Redo', 'redo-icon', 'redo') }
    ]);

    return (
        <div>
            <div id="editor-container" contentEditable="true">
                {/* Editor content */}
            </div>
        </div>
    );
};

export default Editor;
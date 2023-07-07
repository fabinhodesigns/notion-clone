import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css';
import { BsArrowUpRight } from 'react-icons/bs';
import {
    RxFontBold,
    RxFontItalic,
    RxStrikethrough,
    RxChevronDown,
    RxChatBubble,
    RxCode
} from 'react-icons/rx'
import { BubbleButton } from './BubbleButton';

lowlight.registerLanguage('js', js);

export function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeBlockLowlight.configure({
                lowlight
            })
        ],
        editorProps: {
            attributes: {
                class: 'outline-none placeholder-gray-400',
                placeholder: 'Sem título'
            }
        }
    });

    return (
        <>
            {editor && (
                <FloatingMenu className="bg-white py-2 px-1 shadow-xl border gap-1 border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
                    editor={editor}
                    shouldShow={({ state }) => {
                        const { $from } = state.selection;
                        const currentLineText = $from.nodeBefore?.textContent;

                        return currentLineText === '/';
                    }}
                >
                    <button 
                        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
                        onClick={() => 
                            editor.chain().focus().toggleHeading({ level: 1 }).run()
                        }
                    >
                        <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/text/en-US.png" />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Heading 1</span>
                            <span className="text-xs text-zinc-400">Big section heading</span>
                        </div>
                    </button>
                    <button 
                        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
                        onClick={() => 
                            editor.chain().focus().toggleHeading({ level: 2 }).run()
                        }
                    >
                        <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/subheader.9aab4769.png" />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Heading 2</span>
                            <span className="text-xs text-zinc-400">Normal section heading.</span>
                        </div>
                    </button>
                    <button 
                        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
                        onClick={() => 
                            editor.chain().focus().toggleHeading({ level: 3 }).run()
                        }
                    >
                        <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png" />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Heading 3</span>
                            <span className="text-xs text-zinc-400">Small section heading.</span>
                        </div>
                    </button>
                </FloatingMenu>
            )}

            <EditorContent className="max-w-[700px] mx-auto pt-16 prose prose-blue h-full" editor={editor} />
            
            <style>
                {`
                .ProseMirror::placeholder {
                    color: #9CA3AF;
                }
                `}
            </style>

            {editor && (
                <BubbleMenu className="bg-white shadow-xl border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-x-zinc-600"
                    editor={editor}
                >

                <BubbleButton>
                    Text <RxChevronDown  className="w-4 h-4" />
                </BubbleButton>
                <BubbleButton>
                    <BsArrowUpRight className="w-4 h-4" /> Link
                </BubbleButton>
                <BubbleButton>
                    <RxChatBubble className="w-4 h-4" /> Comment
                </BubbleButton>
                <div className="flex items-center">
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        data-active={editor.isActive('bold')}
                    >
                        <RxFontBold className="w-4 h-4" /> 
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        data-active={editor.isActive('italic')}
                    >
                        <RxFontItalic className="w-4 h-4" /> 
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        data-active={editor.isActive('strike')}
                    >
                        <RxStrikethrough className="w-4 h-4" /> 
                    </BubbleButton>
                    <BubbleButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        data-active={editor.isActive('code')}
                    >
                        <RxCode className="w-4 h-4" /> 
                    </BubbleButton>
                </div>
                </BubbleMenu>
            )}
        </>
    )
}
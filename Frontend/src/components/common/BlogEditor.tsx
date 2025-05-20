// import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface BlogEditorProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}
const BlogEditor = ({ value, setValue }: BlogEditorProps) => {
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');

  // const handlePublish = () => {

  //   const blogData = {
  //     title,
  //     content,
  //     date: new Date().toISOString(),
  //   };
  //   console.log(blogData);
  //   // TODO: Send to backend API
  //   alert('Blog Published!');
  // };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike',],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script', 'blockquote', 'code-block',
    'list', 'indent', 'direction',
    'align',
    'link', 'image', 'video', 'formula'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* <h1 className="text-3xl font-bold text-orange-600 mb-6">✍️ Create New Blog</h1> */}

      {/* <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        className="w-full p-3 mb-6 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
      /> */}

      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Start writing your blog..."
        className="mb-6"
        modules={modules}
        formats={formats}
      />

      {/* <button
        onClick={handlePublish}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded transition-all duration-300"
      >
        🚀 Publish Blog
      </button> */}
    </div>
  );
};

export default BlogEditor;

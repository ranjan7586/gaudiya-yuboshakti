import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = () => {
    const blogData = {
      title,
      content,
      date: new Date().toISOString(),
    };
    console.log(blogData);
    // TODO: Send to backend API
    alert('Blog Published!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">✍️ Create New Blog</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        className="w-full p-3 mb-6 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Start writing your blog..."
        className="mb-6"
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'list',
          'bullet',
          'link',
          'image',
        ]}
      />

      <button
        onClick={handlePublish}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded transition-all duration-300"
      >
        🚀 Publish Blog
      </button>
    </div>
  );
};

export default BlogEditor;

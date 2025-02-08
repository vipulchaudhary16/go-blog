import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

interface QuillEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const QuillEditor = (props: QuillEditorProps) => {
  const { content, onContentChange } = props;
  const handleChange = (value: string) => {
    onContentChange(value);
  };

  return <ReactQuill value={content} onChange={handleChange} theme="snow" />;
};

export default QuillEditor;

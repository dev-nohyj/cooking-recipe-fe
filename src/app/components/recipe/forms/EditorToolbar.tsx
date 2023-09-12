import { colors } from '@/asset/colors';

interface Props {}

const EditorToolbar: React.FC<Props> = () => {
    return (
        <div id="toolbar">
            <span className="ql-formats">
                <select className="ql-header" defaultValue="">
                    <option value="1">헤딩 1</option>
                    <option value="2">헤딩 2</option>
                    <option value="">텍스트</option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
                <button className="ql-blockquote" />
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <select className="ql-align" />
            </span>
            <span className="ql-formats">
                <select className="ql-color" defaultValue={colors.black}>
                    <option value={colors.black} />
                    <option value={colors.grey0} />
                    <option value={colors.red} />
                </select>
                <select className="ql-background" />
            </span>
            <span className="ql-formats">
                <button className="ql-link" />
                <button className="ql-image" />
            </span>
        </div>
    );
};

export default EditorToolbar;

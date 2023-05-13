import { useRecoilValue } from 'recoil';
import { boardList } from '../../modules/state/board';
import PostList from './organisms/PostList';

const GeneralComponent = ({ board, title }: { board: string; title: string }) => {
    const list = useRecoilValue(boardList);

    return (
        <main>
            {(list && list.length !== 0) && <PostList board={board} category={title} list={list} />}
        </main>
    );
};

export default GeneralComponent;

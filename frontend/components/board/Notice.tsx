import { useRecoilValue } from 'recoil';
import { boardList } from '../../modules/state/board';
import PostList from './organisms/PostList';

const NoticeComponent = () => {
    const list = useRecoilValue(boardList);

    return (
        <main>
            {(list && list.length) && <PostList category="공지" list={list} />}
        </main>
    );
};

export default NoticeComponent;

import { useRecoilValue } from 'recoil';
import { boardList } from '../../modules/state/board';
import Navigator from '../organisms/Navigator';
import PostList from './organisms/PostList';

const NoticeComponent = () => {
    const list = useRecoilValue(boardList);

    return (
        <main>
            <Navigator />
            {(list && list.length) && <PostList category="공지" list={list} />}
        </main>
    );
};

export default NoticeComponent;

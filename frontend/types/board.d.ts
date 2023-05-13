export interface BoardListBody {
    id: number;
    nickname: string;
    title: string;
    content: string;
    date: string;
    view: number;
}
export interface PostItemProps {
    link: string;
    category: string;
    title: string;
    nickname: string;
    date: string;
    view: number;
}
export interface ContentsProps {
    id: number,
    date: string,
    title: string,
    content: string,
    view: number,
    nickname: string,
    fix: boolean
}

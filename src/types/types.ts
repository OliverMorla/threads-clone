interface Thread {
    _id: string;
    text: string;
    likes: number;
    replies: number;
    children: Thread[] | null;
    user: {
        _id: string;
        username: string;
        image: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    image: string;
    bio: string;
    verified: boolean;
    threads: Thread[];
    createdAt: string;
    updatedAt: string;
}

interface ThreadProps {
    username: string;
    text: string;
    createdAt: string;
    likes: number;
    replies: number;
    childrenThreads: Thread[] | null;
    userId: string;
    threadId: string;
    userImage: string;    
}
export interface Course {
    id: string;
    title: string;
    level: string;
    description: string;
    created_at: string;
    materials: Material[];
    quizzes: CourseQuiz[];
    score: Score;
}

export interface Score {
    correct: number;
    total: number;
    percentage: number;
}

export interface Material {
    id: string;
    course_id: string;
    type: 'text' | 'video';
    content: string;
    order_number: number;
    created_at: string;
    title: string;
}

export interface CourseQuiz {
    id: number;
    course_id: number;
    question: string;
    options: string[];
    correct_answer: string;
    quiz_image_url?: string;
}

export interface LevelProgress {
    level: string;
    completed: number;
    total: number;
    percentage: number;
    completed_course_ids: string[];
}
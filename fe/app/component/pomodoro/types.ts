export type ModeType = 'pomodoro' | 'short_break' | 'long_break';

export interface Mode {
    name: string;
    duration: number;
    color: string;
    text: string;
    ring: string;
    bg: string;
}

export type Modes = {
    [K in ModeType]: Mode;
};

export interface Session {
    id: number;
    user_id: number;
    type: ModeType;
    duration_minutes: number;
    started_at: string;
}

export interface PomodoroTimerProps {
    userId: number;
}

export interface PomodoroSummary {
    total_minutes: number;
}
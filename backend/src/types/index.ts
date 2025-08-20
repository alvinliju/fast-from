export interface Form {
    user_id: string;
    title: string;
    description: string;
    content: any;
    isPublic: boolean;
    created_at: string;
    updated_at: string;
}

export interface Response {
    form_id: string;
    data: any;
    created_at: string;
}
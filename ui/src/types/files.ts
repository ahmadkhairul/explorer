export interface FileProps {
    id: number;
    parent_id: number;
    name: string;
    type: string;
    size: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

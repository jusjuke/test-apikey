-- api_keys 테이블 생성

CREATE TABLE IF NOT EXISTS api_keys (

    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    name TEXT NOT NULL,

    key TEXT NOT NULL,

    usage INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL

);



-- RLS 정책 설정 (Row Level Security)

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;



-- 모든 작업을 허용하는 정책 추가

CREATE POLICY "Enable all operations for all users" ON api_keys

    FOR ALL

    USING (true)

    WITH CHECK (true);

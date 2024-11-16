# 대시보드 API 키 관리 시스템

## 구현된 기능

### 1. API 키 관리
- 테이블 형식의 API 키 목록 표시
- 사용자 지정 이름으로 새 API 키 생성
- 기존 API 키 삭제
- 각 API 키별 고유 식별자 및 사용량 추적

### 2. API 키 보안 기능
- API 키 기본 마스킹 처리 (앞 5자리만 표시)
- 눈 모양 아이콘으로 전체 API 키 표시 여부 토글
- 형식: `tvly-********************************`
- 랜덤 문자열을 사용한 안전한 키 생성

### 3. 페이지 이동
- /dashboard 페이지로 리다이렉트 기능
- API 키 생성과 페이지 이동 통합
- 브레드크럼 네비게이션 구현

### 4. UI 구성요소
- 새 API 키 생성을 위한 모달
- 아이콘이 있는 액션 버튼:
  - Eye/EyeOff: 키 표시 여부 토글
  - Copy: 키 복사
  - Edit: 키 설정 편집
  - Trash: 키 삭제
- 반응형 테이블 레이아웃
- 현재 플랜 표시 카드

### 5. 주요 함수

```typescript
// API 키 타입 정의
type ApiKey = {
  id: string;
  name: string;
  key: string;
  usage: number;
};

// 키 관리 함수들
const handleCreateKey = () => {
  // 마스킹된 상태로 새 API 키 생성
};

const handleToggleKeyVisibility = (id: string) => {
  // API 키 표시 여부 토글
};

const maskApiKey = (key: string, isVisible: boolean) => {
  // 앞 5자리를 제외한 API 키 마스킹
};

const handleDeleteKey = (id: string) => {
  // 목록에서 API 키 제거
};

const handleRedirectAndCreateKey = () => {
  // 키 생성 후 대시보드로 이동
};
```

### 6. 상태 관리
- API 키 배열
- 각 키별 표시 여부 상태
- 키 생성 모달 상태
- 새 키 이름 입력 상태

### 7. 스타일링
- TailwindCSS 적용
- 반응형 디자인
- 일관된 UI 컴포넌트
- 그라데이션 배경
- 호버 효과 및 전환 효과

### 8. 접근성
- 버튼에 ARIA 레이블 적용
- 시맨틱 HTML 구조
- 키보드 네비게이션 지원
- 명확한 시각적 피드백

## 구현 참고사항

1. 모든 API 키는 생성 시 자동으로 마스킹 처리됨
2. 표시 여부는 키별로 개별 관리됨
3. 키 생성은 'tvly-' 접두어 패턴을 따름
4. UI는 현대적인 대시보드 디자인 원칙을 따름
5. 상태 관리는 키 데이터와 표시 여부 상태를 모두 처리

## 향후 개선사항

1. 클립보드 복사 기능 추가
2. 키 이름 수정 기능 구현
3. 키 사용량 분석 추가
4. API 키 유효성 검사 구현
5. 검색 및 필터 기능 추가
6. 대량의 키 목록을 위한 페이지네이션 구현
7. 키 만료일 추가
8. 키 사용량 제한 구현

## 보안 고려사항

1. API 키는 기본적으로 마스킹 처리
2. 페이지 새로고침 시 표시 여부 초기화
3. 키는 서버 측에서 생성 (구현 예정)
4. 로컬 스토리지에 키 저장하지 않음
5. 키 표시 여부에 대한 세션 관리

## 코드 구조
```
src/
  ├── app/
  │   └── dashboard/
  │       └── page.tsx
  └── components/
      └── icons/
          ├── EyeIcon.tsx
          ├── EyeOffIcon.tsx
          ├── CopyIcon.tsx
          ├── EditIcon.tsx
          └── TrashIcon.tsx
```

이 README 파일은 현재까지 구현된 기능들과 코드 구조를 정리한 문서입니다. 향후 개발 시 참고할 수 있도록 주요 기능, 구현 내용, 보안 고려사항 등을 포함하고 있습니다.
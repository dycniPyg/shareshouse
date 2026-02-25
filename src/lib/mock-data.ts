export type Lead = {
  id: string;
  name: string;
  channel: string;
  desiredMoveIn: string;
  stage: "신규" | "상담중" | "방문예약" | "계약대기" | "계약완료";
};

export type Invoice = {
  id: string;
  resident: string;
  month: string;
  amount: number;
  status: "납부완료" | "부분납부" | "미납";
  dueDate: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
};

export type Ticket = {
  id: string;
  title: string;
  category: "전기" | "배관" | "소음" | "청소";
  status: "신규" | "진행중" | "대기" | "완료";
  assignee: string;
  sla: string;
};

export type UtilityReading = {
  month: string;
  electricity: number;
  water: number;
  gas: number;
  alert: string;
};

export type ResidentRoutine = {
  resident: string;
  room: string;
  billNotice: "확인" | "미확인";
  autoPay: "활성" | "비활성";
  complaintTicket: string;
  rulesNotice: "읽음" | "미읽음";
  updatedAt: string;
};

export type ContractItem = {
  contractId: string;
  resident: string;
  room: string;
  leaseTerm: string;
  deposit: number;
  rent: number;
  status: "입주대기" | "입주완료" | "퇴실예정";
  moveInDate: string;
  moveOutDate: string;
  checklistProgress: string;
};

export type AutoPayItem = {
  resident: string;
  room: string;
  method: "계좌이체" | "가상계좌";
  bank: string;
  accountMasked: string;
  nextPaymentDate: string;
  status: "정상" | "실패재시도";
};

export type PipelineStat = {
  step: "모집" | "입주/계약" | "월세/정산" | "청결/민원" | "에너지/공과금";
  total: number;
  delayed: number;
  owner: string;
  todayAction: string;
};

export type RoutineActionItem = {
  resident: string;
  room: string;
  issue: string;
  priority: "높음" | "중간" | "낮음";
  action: string;
  dueAt: string;
};

export type ResidentBillingAccount = {
  resident: string;
  room: string;
  bank: string;
  accountNumberMasked: string;
  accountHolder: string;
  autoPay: "활성" | "비활성";
  verifiedAt: string;
  status: "정상" | "확인필요";
};

export type StaffMember = {
  id: string;
  name: string;
  role: "운영자" | "스태프" | "정산 담당" | "시설 담당";
  phone: string;
  assignedHouse: string;
  status: "근무중" | "휴무";
};

export type StaffAssignment = {
  taskType: "모집/리드" | "입주/계약" | "월세/정산" | "청결/민원" | "에너지/공과금";
  assignee: string;
  workload: number;
  overdue: number;
  sla: string;
};

export type WorkflowStep = {
  phase: string;
  objective: string;
  owner: string;
  trigger: string;
  output: string;
  kpi: string;
};

export type RolePolicy = {
  role: "운영자" | "스태프" | "정산 담당" | "시설 담당";
  scope: string;
  permissions: string;
  updatedAt: string;
};

export const summaryCards = [
  { label: "공실률", value: "8.5%", delta: "전월 대비 -1.2%" },
  { label: "미납 건수", value: "6건", delta: "D+7 초과 2건" },
  { label: "민원 평균 처리", value: "19시간", delta: "목표 24시간 이내" },
  { label: "청소 미이행", value: "3건", delta: "재배정 완료 2건" },
];

export const leads: Lead[] = [
  { id: "L-2301", name: "김민지", channel: "네이버", desiredMoveIn: "2026-03-05", stage: "상담중" },
  { id: "L-2302", name: "이현우", channel: "유튜브", desiredMoveIn: "2026-03-12", stage: "방문예약" },
  { id: "L-2303", name: "박지훈", channel: "직접유입", desiredMoveIn: "2026-03-20", stage: "신규" },
  { id: "L-2304", name: "최다은", channel: "카카오", desiredMoveIn: "2026-03-01", stage: "계약대기" },
];

export const contractPipeline = [
  { step: "입주 체크리스트", count: 11 },
  { step: "서류 검토중", count: 4 },
  { step: "계약 확정", count: 9 },
  { step: "퇴실 정산 대기", count: 2 },
];

export const contracts: ContractItem[] = [
  {
    contractId: "CTR-2602-001",
    resident: "김민지",
    room: "101호",
    leaseTerm: "2026-03-01 ~ 2027-02-28",
    deposit: 2000000,
    rent: 650000,
    status: "입주완료",
    moveInDate: "2026-03-01",
    moveOutDate: "2027-02-28",
    checklistProgress: "10/10",
  },
  {
    contractId: "CTR-2602-002",
    resident: "이현우",
    room: "102호",
    leaseTerm: "2026-03-15 ~ 2027-03-14",
    deposit: 1500000,
    rent: 620000,
    status: "입주대기",
    moveInDate: "2026-03-15",
    moveOutDate: "2027-03-14",
    checklistProgress: "7/10",
  },
  {
    contractId: "CTR-2503-019",
    resident: "박지훈",
    room: "201호",
    leaseTerm: "2025-03-01 ~ 2026-02-28",
    deposit: 2500000,
    rent: 700000,
    status: "퇴실예정",
    moveInDate: "2025-03-01",
    moveOutDate: "2026-02-28",
    checklistProgress: "9/10",
  },
];

export const moveInChecklistItems = [
  "전자계약 서명 완료",
  "보증금 입금 확인",
  "신분증/비상연락망 등록",
  "생활 규칙/공지 동의",
  "관리앱 계정 활성화",
  "입주 전 사진 기록",
];

export const invoices: Invoice[] = [
  {
    id: "INV-2602-01",
    resident: "101호 김민지",
    month: "2026-02",
    amount: 650000,
    status: "납부완료",
    dueDate: "2026-02-25",
    bank: "신한은행",
    accountNumber: "110-312-889901",
    accountHolder: "쉐어하우스운영(주)",
  },
  {
    id: "INV-2602-02",
    resident: "102호 이현우",
    month: "2026-02",
    amount: 620000,
    status: "부분납부",
    dueDate: "2026-02-25",
    bank: "신한은행",
    accountNumber: "110-312-889901",
    accountHolder: "쉐어하우스운영(주)",
  },
  {
    id: "INV-2602-03",
    resident: "201호 박지훈",
    month: "2026-02",
    amount: 700000,
    status: "미납",
    dueDate: "2026-02-25",
    bank: "국민은행",
    accountNumber: "547801-04-120934",
    accountHolder: "쉐어하우스운영(주)",
  },
  {
    id: "INV-2602-04",
    resident: "202호 최다은",
    month: "2026-02",
    amount: 680000,
    status: "납부완료",
    dueDate: "2026-02-25",
    bank: "국민은행",
    accountNumber: "547801-04-120934",
    accountHolder: "쉐어하우스운영(주)",
  },
];

export const autoPayItems: AutoPayItem[] = [
  {
    resident: "김민지",
    room: "101호",
    method: "계좌이체",
    bank: "신한은행",
    accountMasked: "110-***-**9901",
    nextPaymentDate: "2026-03-25",
    status: "정상",
  },
  {
    resident: "이현우",
    room: "102호",
    method: "가상계좌",
    bank: "국민은행",
    accountMasked: "547801-**-**0934",
    nextPaymentDate: "2026-03-25",
    status: "실패재시도",
  },
  {
    resident: "최다은",
    room: "202호",
    method: "계좌이체",
    bank: "하나은행",
    accountMasked: "357-***-*****",
    nextPaymentDate: "2026-03-25",
    status: "정상",
  },
];

export const tickets: Ticket[] = [
  { id: "T-901", title: "욕실 배수 느림", category: "배관", status: "진행중", assignee: "설비팀", sla: "12시간" },
  { id: "T-902", title: "심야 소음 신고", category: "소음", status: "신규", assignee: "매니저 김", sla: "24시간" },
  { id: "T-903", title: "주방등 점멸", category: "전기", status: "대기", assignee: "전기기사", sla: "36시간" },
  { id: "T-904", title: "공용복도 청소 미완료", category: "청소", status: "완료", assignee: "외주 A", sla: "8시간" },
];

export const utilityReadings: UtilityReading[] = [
  { month: "2025-12", electricity: 2480, water: 190, gas: 320, alert: "정상" },
  { month: "2026-01", electricity: 2730, water: 214, gas: 355, alert: "전기 +10%" },
  { month: "2026-02", electricity: 3110, water: 218, gas: 402, alert: "급증 경고" },
];

export const residentRoutines: ResidentRoutine[] = [
  {
    resident: "김민지",
    room: "101호",
    billNotice: "확인",
    autoPay: "활성",
    complaintTicket: "T-901 (진행중)",
    rulesNotice: "읽음",
    updatedAt: "2026-02-25 10:20",
  },
  {
    resident: "이현우",
    room: "102호",
    billNotice: "미확인",
    autoPay: "비활성",
    complaintTicket: "신규 접수 없음",
    rulesNotice: "읽음",
    updatedAt: "2026-02-25 09:05",
  },
  {
    resident: "박지훈",
    room: "201호",
    billNotice: "확인",
    autoPay: "활성",
    complaintTicket: "T-902 (신규)",
    rulesNotice: "미읽음",
    updatedAt: "2026-02-24 21:44",
  },
  {
    resident: "최다은",
    room: "202호",
    billNotice: "확인",
    autoPay: "활성",
    complaintTicket: "T-904 (완료)",
    rulesNotice: "읽음",
    updatedAt: "2026-02-25 08:11",
  },
];

export const pipelineStats: PipelineStat[] = [
  {
    step: "모집",
    total: 43,
    delayed: 5,
    owner: "리드 매니저",
    todayAction: "방문예약 미확정 5건 연락",
  },
  {
    step: "입주/계약",
    total: 17,
    delayed: 3,
    owner: "계약 담당자",
    todayAction: "체크리스트 80% 미만 3건 보완",
  },
  {
    step: "월세/정산",
    total: 52,
    delayed: 6,
    owner: "정산 담당자",
    todayAction: "D+1 미납 6건 리마인드 발송",
  },
  {
    step: "청결/민원",
    total: 14,
    delayed: 2,
    owner: "운영 매니저",
    todayAction: "SLA 초과 2건 재배정",
  },
  {
    step: "에너지/공과금",
    total: 9,
    delayed: 1,
    owner: "시설 매니저",
    todayAction: "전기 급증 경고 하우스 점검",
  },
];

export const routineActionQueue: RoutineActionItem[] = [
  {
    resident: "이현우",
    room: "102호",
    issue: "2월 청구서 미확인 + 자동납부 비활성",
    priority: "높음",
    action: "카카오 알림 후 유선 확인",
    dueAt: "2026-02-25 18:00",
  },
  {
    resident: "박지훈",
    room: "201호",
    issue: "공지/규칙 미읽음",
    priority: "중간",
    action: "규칙 재공지 및 읽음 요청",
    dueAt: "2026-02-26 10:00",
  },
  {
    resident: "박지훈",
    room: "201호",
    issue: "민원 티켓 T-902 신규 18시간 경과",
    priority: "높음",
    action: "담당자 배정 후 1차 응답",
    dueAt: "2026-02-25 16:00",
  },
  {
    resident: "최다은",
    room: "202호",
    issue: "자동납부 실패 이력 1회",
    priority: "낮음",
    action: "결제수단 유효성 점검 안내",
    dueAt: "2026-02-27 14:00",
  },
];

export const residentBillingAccounts: ResidentBillingAccount[] = [
  {
    resident: "김민지",
    room: "101호",
    bank: "신한은행",
    accountNumberMasked: "110-***-**9901",
    accountHolder: "김민지",
    autoPay: "활성",
    verifiedAt: "2026-02-24 17:30",
    status: "정상",
  },
  {
    resident: "이현우",
    room: "102호",
    bank: "국민은행",
    accountNumberMasked: "547801-**-**0934",
    accountHolder: "이현우",
    autoPay: "비활성",
    verifiedAt: "2026-02-20 11:05",
    status: "확인필요",
  },
  {
    resident: "박지훈",
    room: "201호",
    bank: "하나은행",
    accountNumberMasked: "357-***-*****",
    accountHolder: "박지훈",
    autoPay: "활성",
    verifiedAt: "2026-02-23 15:22",
    status: "정상",
  },
  {
    resident: "최다은",
    room: "202호",
    bank: "농협은행",
    accountNumberMasked: "302-***-******",
    accountHolder: "최다은",
    autoPay: "활성",
    verifiedAt: "2026-02-25 09:00",
    status: "정상",
  },
];

export const staffMembers: StaffMember[] = [
  {
    id: "ST-001",
    name: "김유진",
    role: "운영자",
    phone: "010-3210-7788",
    assignedHouse: "강남 1호점",
    status: "근무중",
  },
  {
    id: "ST-002",
    name: "박정훈",
    role: "정산 담당",
    phone: "010-8801-2233",
    assignedHouse: "강남 1호점, 2호점",
    status: "근무중",
  },
  {
    id: "ST-003",
    name: "이수빈",
    role: "스태프",
    phone: "010-4422-1188",
    assignedHouse: "강남 2호점",
    status: "휴무",
  },
  {
    id: "ST-004",
    name: "최동혁",
    role: "시설 담당",
    phone: "010-9031-7712",
    assignedHouse: "전 하우스",
    status: "근무중",
  },
];

export const staffAssignments: StaffAssignment[] = [
  {
    taskType: "모집/리드",
    assignee: "김유진",
    workload: 18,
    overdue: 3,
    sla: "24시간 내 1차 응답",
  },
  {
    taskType: "입주/계약",
    assignee: "김유진",
    workload: 9,
    overdue: 1,
    sla: "계약서 48시간 내 확정",
  },
  {
    taskType: "월세/정산",
    assignee: "박정훈",
    workload: 52,
    overdue: 6,
    sla: "미납 D+1 리마인드",
  },
  {
    taskType: "청결/민원",
    assignee: "이수빈",
    workload: 14,
    overdue: 2,
    sla: "SLA 24시간 이내 처리",
  },
  {
    taskType: "에너지/공과금",
    assignee: "최동혁",
    workload: 9,
    overdue: 1,
    sla: "급증 경고 12시간 내 점검",
  },
];

export const businessWorkflow: WorkflowStep[] = [
  {
    phase: "1. 모집/리드",
    objective: "공실 방에 입주 문의 유입",
    owner: "리드 매니저",
    trigger: "문의 폼 접수",
    output: "상담/방문 예약",
    kpi: "문의->방문 전환율",
  },
  {
    phase: "2. 입주/계약",
    objective: "서류 확인 후 계약 확정",
    owner: "계약 담당자",
    trigger: "방문 완료",
    output: "전자계약/입주 체크 완료",
    kpi: "계약 확정 소요일",
  },
  {
    phase: "3. 월세/정산",
    objective: "월 청구 및 수납 완료",
    owner: "정산 담당자",
    trigger: "매월 청구일 도래",
    output: "납부완료/미납조치",
    kpi: "미납률/연체일수",
  },
  {
    phase: "4. 청결/민원",
    objective: "공용공간 품질 유지",
    owner: "운영 매니저",
    trigger: "청소 스케줄/민원 접수",
    output: "작업 완료 및 검수",
    kpi: "민원 TAT/재오픈율",
  },
  {
    phase: "5. 에너지/공과금",
    objective: "비용 급증 사전 탐지",
    owner: "시설 매니저",
    trigger: "월 검침 입력",
    output: "급증 원인 리포트",
    kpi: "급증 탐지 정확도",
  },
];

export const rolePolicies: RolePolicy[] = [
  {
    role: "운영자",
    scope: "전체 하우스",
    permissions: "설정/정산/권한/리포트 전체 접근",
    updatedAt: "2026-02-25 09:30",
  },
  {
    role: "스태프",
    scope: "담당 하우스",
    permissions: "청소/민원/입주 처리, 정산 조회 제한",
    updatedAt: "2026-02-24 14:10",
  },
  {
    role: "정산 담당",
    scope: "정산 모듈",
    permissions: "청구/수납/미납 리마인드/계좌 검증",
    updatedAt: "2026-02-25 10:05",
  },
  {
    role: "시설 담당",
    scope: "에너지/유지보수",
    permissions: "검침/급증 경고/설비 티켓 처리",
    updatedAt: "2026-02-23 17:20",
  },
];

// 삼국 요리 대전 - 게임 데이터

export interface Ingredient {
  category: string;
  items: string[];
}

export interface CookingStep {
  title: string;
  emoji: string;
  description: string;
  duration?: string;
}

export interface Chef {
  id: string;
  name: string;
  kingdom: string;
  city: string;
  emoji: string;
  color: string;
  colorLight: string;
  title: string;
  story: string;
  catchphrase: string;
  dishName: string;
  dishHistory: string;
  ingredients: Ingredient[];
  steps: CookingStep[];
  tips: string[];
  recipeHistory: string;
}

export const chefs: Chef[] = [
  {
    id: "goguryeo",
    name: "대무신",
    kingdom: "고구려",
    city: "개성",
    emoji: "🔥",
    color: "#C62828",
    colorLight: "#EF5350",
    title: "북방 사냥꾼 출신 구이의 달인",
    story: "맥족 전사의 후예로, 사냥한 고기를 불 위에서 최고의 맛으로 바꾸는 능력을 지녔다. 고구려 왕실 연회의 핵심 요리사.",
    catchphrase: "북방의 불맛을 보여주마! 고구려식 된장맥적이다!",
    dishName: "개성식 된장맥적",
    dishHistory: "맥적(貊炙)은 《위서(魏書)》에 기록된 고구려 전통 구이로, 된장 양념에 재운 고기를 석쇠에 구운 요리입니다. 불고기의 원형으로 알려져 있습니다.",
    ingredients: [
      {
        category: "주재료",
        items: ["소고기 양지 400g", "청금채(상추) 한 줌", "깻잎 10장", "조밥용 좁쌀 1컵"],
      },
      {
        category: "된장 양념",
        items: [
          "된장 3큰술",
          "배즙 2큰술",
          "참기름 1큰술",
          "다진 마늘 1큰술",
          "대파 다진 것 2큰술",
          "꿀 1큰술",
          "생강즙 1작은술",
          "천초(초피) 약간",
        ],
      },
    ],
    steps: [
      {
        title: "고기 손질",
        emoji: "🥩",
        description: "소고기 양지를 결 반대 방향으로 0.5cm 두께로 썬다. 키친타월로 핏물을 제거한다.",
        duration: "10분",
      },
      {
        title: "된장 양념 만들기",
        emoji: "🫘",
        description: "된장, 배즙, 참기름, 다진 마늘, 대파, 꿀, 생강즙, 천초를 고루 섞어 양념장을 만든다.",
        duration: "5분",
      },
      {
        title: "고기 재우기",
        emoji: "⏳",
        description: "썰어둔 고기에 양념장을 골고루 발라 최소 2시간 이상 재운다. 하룻밤이면 더욱 좋다.",
        duration: "2시간+",
      },
      {
        title: "석쇠 예열",
        emoji: "🔥",
        description: "참숯을 피워 석쇠를 달군다. 손을 올렸을 때 3초 정도 버틸 수 있는 온도가 적당하다.",
        duration: "5분",
      },
      {
        title: "맥적 굽기",
        emoji: "🥓",
        description: "양념한 고기를 석쇠에 올려 앞뒤로 각 3분씩 굽는다. 너무 자주 뒤집지 않는 것이 핵심.",
        duration: "6분",
      },
      {
        title: "담음새",
        emoji: "🍽️",
        description: "구운 맥적을 청금채와 깻잎 위에 올리고, 조밥과 함께 상에 낸다.",
        duration: "3분",
      },
    ],
    tips: [
      "천초(초피)는 고추가 없던 삼국시대의 매운맛 대용입니다. 산초로 대체 가능합니다.",
      "좁쌀은 30분 불린 후 밥을 지으면 찰기가 살아납니다.",
      "쌈 싸먹기: 청금채 위에 맥적을 올리고 조밥 한 숟갈과 함께 싸먹으면 삼국시대 식사법!",
    ],
    recipeHistory:
      "맥적은 중국 《위서》에 '맥족(고구려)의 구이'로 기록된 음식으로, 된장 양념에 고기를 재워 굽는 방식이 오늘날 불고기의 원조로 평가됩니다.",
  },
  {
    id: "baekje",
    name: "온조",
    kingdom: "백제",
    city: "전주",
    emoji: "🐟",
    color: "#2E7D32",
    colorLight: "#66BB6A",
    title: "풍요로운 벌판의 죽/탕 장인",
    story: "백제의 비옥한 평야에서 나는 쌀과 민물고기를 다루는 장인. 왕실의 보양식을 담당하며 영양과 맛의 균형을 추구한다.",
    catchphrase: "백제 들녘의 깊은 맛, 전주식 민물어죽이오!",
    dishName: "전주식 민물어죽",
    dishHistory: "민물어죽은 백제 시대부터 이어진 보양식으로, 벽골제(AD 330년) 축조 이후 풍부해진 쌀과 민물고기를 활용한 대표 음식입니다.",
    ingredients: [
      {
        category: "주재료",
        items: ["민물생선(붕어 또는 메기) 1마리", "쌀 1컵", "물 8컵"],
      },
      {
        category: "육수재료",
        items: ["대파 1대", "생강 1쪽", "달걀 1개"],
      },
      {
        category: "양념/고명",
        items: [
          "참기름 1큰술",
          "애호박 반 개",
          "미나리 한 줌",
          "콩나물 한 줌",
          "국간장 1큰술",
          "소금 약간",
        ],
      },
    ],
    steps: [
      {
        title: "쌀 불리기",
        emoji: "🌾",
        description: "쌀을 깨끗이 씻어 30분간 물에 불린다.",
        duration: "30분",
      },
      {
        title: "민물어 육수 내기",
        emoji: "🐟",
        description: "손질한 민물생선에 물 8컵, 대파, 생강을 넣고 30분간 푹 끓여 육수를 낸다.",
        duration: "30분",
      },
      {
        title: "육수 거르고 살 발라내기",
        emoji: "🦴",
        description: "체에 육수를 거르고, 생선살을 곱게 발라낸다. 뼈는 버린다.",
        duration: "10분",
      },
      {
        title: "쌀 볶기",
        emoji: "🍚",
        description: "참기름에 불린 쌀을 넣고 5분간 볶아 투명해질 때까지 익힌다.",
        duration: "5분",
      },
      {
        title: "죽 끓이기",
        emoji: "🫕",
        description: "볶은 쌀에 거른 육수를 붓고 약불에서 20분간 저어가며 끓인다.",
        duration: "20분",
      },
      {
        title: "생선살 풀기 + 양념",
        emoji: "🥄",
        description: "발라둔 생선살과 채 썬 애호박을 넣고 5분 더 끓인다. 국간장과 소금으로 간한다.",
        duration: "5분",
      },
      {
        title: "담음새",
        emoji: "🍽️",
        description: "그릇에 죽을 담고 미나리, 콩나물, 달걀지단을 올려 완성한다.",
        duration: "3분",
      },
    ],
    tips: [
      "붕어 대신 메기, 미꾸라지, 동태로 대체 가능합니다.",
      "전주식 특징: 콩나물을 함께 넣어 아삭한 식감을 더합니다.",
      "어죽은 단백질과 탄수화물이 균형 잡힌 옛 보양식으로, 회복기 환자에게 좋습니다.",
    ],
    recipeHistory:
      "백제는 AD 32년경부터 벼농사를 시작했으며, 벽골제(330년) 축조 후 쌀 생산이 급증했습니다. 풍부한 쌀과 금강·만경강의 민물고기를 결합한 어죽은 백제인의 지혜가 담긴 대표 음식입니다.",
  },
  {
    id: "silla",
    name: "이사금",
    kingdom: "신라",
    city: "안동",
    emoji: "🏺",
    color: "#6A1B9A",
    colorLight: "#AB47BC",
    title: "발효의 마법사, 반상의 명인",
    story: "신라의 식품 관리 관료 출신으로, 단순한 재료를 발효의 힘으로 깊은 맛으로 바꾸는 달인. 격식 있는 반상 차림의 대가.",
    catchphrase: "발효의 깊은 맛, 신라 안동식 보리반상을 받으시오!",
    dishName: "안동식 발효 보리반상",
    dishHistory: "신라는 683년(신문왕) 식품 관리 관청을 설치할 정도로 음식 문화가 체계적이었습니다. 안동식 반상은 발효 음식의 정수를 담은 한 상 차림입니다.",
    ingredients: [
      {
        category: "보리밥",
        items: ["찰보리 1컵", "쌀 0.5컵"],
      },
      {
        category: "간고등어",
        items: ["안동 간고등어 1마리"],
      },
      {
        category: "삼색나물",
        items: ["고사리 100g", "시금치 100g", "콩나물 100g", "참기름·깨소금 적당량"],
      },
      {
        category: "된장국",
        items: ["된장 2큰술", "두부 반 모", "대파 1대", "멸치육수 3컵"],
      },
      {
        category: "안동식혜",
        items: ["조청(엿기름물) 2컵", "꿀 2큰술", "생강즙 1큰술", "밥 1공기"],
      },
    ],
    steps: [
      {
        title: "보리밥 짓기",
        emoji: "🌾",
        description: "찰보리를 1시간 불린 후 쌀과 함께 밥을 짓는다. 보리:쌀 = 7:3 비율.",
        duration: "1시간",
      },
      {
        title: "간고등어 굽기",
        emoji: "🐟",
        description: "간고등어를 중불에서 앞면 7분, 뒷면 5분 구워 노릇하게 익힌다.",
        duration: "12분",
      },
      {
        title: "삼색나물 무치기",
        emoji: "🥬",
        description: "고사리·시금치·콩나물을 각각 데쳐 참기름, 깨소금, 소금으로 무친다.",
        duration: "15분",
      },
      {
        title: "된장국 끓이기",
        emoji: "🍲",
        description: "멸치육수에 된장을 풀고 두부, 대파를 넣어 10분간 끓인다.",
        duration: "10분",
      },
      {
        title: "안동식혜 준비",
        emoji: "🍯",
        description: "엿기름물에 밥을 넣고 보온(60도)에서 6시간 삭힌 후 생강즙을 넣는다.",
        duration: "6시간",
      },
      {
        title: "반상 차리기",
        emoji: "🍽️",
        description: "보리밥을 중심으로 간고등어, 삼색나물, 된장국, 식혜를 격식에 맞게 배치한다.",
        duration: "5분",
      },
    ],
    tips: [
      "간고등어는 소금이 이미 배어 있으니 별도 간을 하지 마세요.",
      "안동식혜 vs 일반 식혜: 생강이 들어가 맵싸한 맛이 특징입니다. 고춧가루를 넣는 집도 있습니다.",
      "보리와 쌀의 비율은 7:3이 찰기와 식감의 최적 비율입니다.",
    ],
    recipeHistory:
      "신라는 《삼국사기》에 기록된 대로 683년(신문왕 3년) 식품 관리 관청을 두어 체계적으로 음식을 관리했습니다. 안동은 이러한 전통이 가장 잘 보존된 지역으로, 발효 문화의 중심지입니다.",
  },
];

// 서사적 내레이션 텍스트 (개선 #2)
export const narrations = {
  intro:
    "때는 삼국시대, 고구려·백제·신라 세 나라의 왕들이 한자리에 모였다.\n각국 최고의 요리사를 내세워 자존심 대결을 벌이기로 하니...\n과연 어느 나라의 요리가 가장 뛰어날 것인가!",
  beforeCooking: (name: string, kingdom: string) =>
    `${kingdom}의 ${name}이(가) 조리대 앞에 섰다!\n과연 어떤 요리를 보여줄 것인가?`,
  beforeJudging:
    "세 가지 요리가 모두 완성되었다.\n이제 그대가 심판이 되어 승부를 가려주시오!",
  beforeResult:
    "심사가 끝났다.\n삼국의 운명이 결정되는 순간이 다가온다...",
};

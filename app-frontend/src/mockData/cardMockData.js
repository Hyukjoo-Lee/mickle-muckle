export const CARD_TYPES = {
  CREDIT: '신용',
  DEBIT: '체크',
};

/**
 * 기관코드 from codef API
 * 국민 - 0301
 * 현대 - 0302
 * 삼성 - 0303
 * 농협 - 0304
 * 신한 - 0306
 */
export const card_images = {
  '0301': {
    // KB국민 My WE:SH카드
    my: {
      my1: require('../assets/images/cards/kb/kb-my1.png'),
      my2: require('../assets/images/cards/kb/kb-my2.png'),
      my3: require('../assets/images/cards/kb/kb-my3.png'),
      my4: require('../assets/images/cards/kb/kb-my4.png'),
    },
  },
  '0302': {
    // 현대 M카드
    m: {
      m1: require('../assets/images/cards/hyundai/hyundai-m1.png'),
      m2: require('../assets/images/cards/hyundai/hyundai-m2.png'),
      m3: require('../assets/images/cards/hyundai/hyundai-m3.png'),
    },
  },
  '0303': {
    // 삼성iD SIMPLE카드
    id: {
      id1: require('../assets/images/cards/samsung/samsung-id1.png'),
      id2: require('../assets/images/cards/samsung/samsung-id2.png'),
      id3: require('../assets/images/cards/samsung/samsung-id3.png'),
    },
  },
  '0304': {
    // 농협 별다줄카드
    byul: {
      byul1: require('../assets/images/cards/nh/nh-byul1.png'),
      byul2: require('../assets/images/cards/nh/nh-byul2.png'),
      byul3: require('../assets/images/cards/nh/nh-byul3.png'),
      byul4: require('../assets/images/cards/nh/nh-byul4.png'),
    },
  },
  '0306': {
    // 신한 처음카드
    first: {
      first1: require('../assets/images/cards/shinhan/shinhan-first1.png'),
      first2: require('../assets/images/cards/shinhan/shinhan-first2.png'),
    },
  },
};

export const CARD_COMPANIES = {
  KB: 'KB국민',
  HYUNDAI: '현대',
  SAMSUNG: '삼성',
  NONGHYUP: '농협',
  SHINHAN: '신한',
};

// 등록된 카드 데이터 (특정 이미지)
export const registeredCardData = [
  {
    id: '0301',
    type: CARD_TYPES.CREDIT,
    cardNumber: '0000-0000-0000-0000',
    cardTitle: `${CARD_COMPANIES.KB} My WE:SH카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0301'].my.my2,
    mainBenefit: '국내외 가맹점 0.8% 할인',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: '0302',
    cardNumber: '0000-0000-0000-0000',
    type: CARD_TYPES.CREDIT,
    cardTitle: `${CARD_COMPANIES.HYUNDAI} M카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0302'].m.m2,
    mainBenefit: '통신·구독·멤버십 최대 20% 적립',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: '0303',
    type: CARD_TYPES.CREDIT,
    cardNumber: '0000-0000-0000-0000',
    cardTitle: `${CARD_COMPANIES.SAMSUNG}iD SIMPLE카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0303'].id.id2,
    mainBenefit: '온라인 쇼핑 최대 10% 할인',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: '0304',
    type: CARD_TYPES.CREDIT,
    cardNumber: '0000-0000-0000-0000',
    cardTitle: `${CARD_COMPANIES.NONGHYUP} 별다줄카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0304'].byul.byul2,
    mainBenefit: '온라인 쇼핑 최대 5% 할인',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: '0306',
    type: CARD_TYPES.CREDIT,
    cardNumber: '0000-0000-0000-0000',
    cardTitle: `${CARD_COMPANIES.SHINHAN} 처음카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0306'].first.first2,
    mainBenefit: '캐시백 최대 5% 제공',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
];

// 추천 카드 데이터 (이미지 전체)
export const recommendedCardData = [
  {
    id: '0301',
    cardTitle: `${CARD_COMPANIES.KB} My WE:SH카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0301'].my.my1,
    mainBenefit: '국내외 가맹점 0.8% 할인',
    cardApplyLink:
      'https://m.kbcard.com/CRD/DVIEW/MCAMCXHIACRC0002?mainCC=b&allianceCode=09123',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: '0302',
    cardTitle: `${CARD_COMPANIES.HYUNDAI} M카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0302'].m.m1,
    mainBenefit: '통신·구독·멤버십 최대 20% 적립',
    cardApplyLink:
      'https://www.hyundaicard.com/cpc/ma/CPCMA0101_01.hc?cardflag=PT',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: '0303',
    cardTitle: `${CARD_COMPANIES.SAMSUNG}iD SIMPLE카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0303'].id.id1,
    mainBenefit: '온라인 쇼핑 최대 10% 할인',
    cardApplyLink:
      'https://www.samsungcard.com/home/card/cardinfo/PGHPPCCCardCardinfoDetails001?code=AAP1767',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: '0304',
    cardTitle: `${CARD_COMPANIES.NONGHYUP} 별다줄카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0304'].byul.byul1,
    mainBenefit: '온라인 쇼핑 최대 5% 할인',
    cardApplyLink: 'https://card.nonghyup.com/IpCc2021R.act',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: '0306',
    cardTitle: `${CARD_COMPANIES.SHINHAN} 처음카드 (${CARD_TYPES.CREDIT})`,
    cardImg: card_images['0306'].first.first1,
    mainBenefit: '캐시백 최대 5% 제공',
    cardApplyLink:
      'https://www.shinhancard.com/mob/MOBFM038N/MOBFM038C47.shc?EntryLoc=3464&tmEntryLoc=&empSeq=2&targetID=&datakey=&agcCd=',
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
];

// 일별통계 데이터
export const dailyStatisticsCardData = [
  {
    id: '0301',
    title: `${CARD_COMPANIES.KB} My WE:SH카드 (${CARD_TYPES.CREDIT})`,
    cardImage: card_images['0301'].my.my1,
    info: [
      { label: '날짜', value: '2024.10.20' },
      { label: '사용처', value: '88맥주집' },
      { label: '카테고리', value: '식비' },
      { label: '사용금액', value: '80,000' },
    ],
  },
  {
    id: '0302',
    title: `${CARD_COMPANIES.HYUNDAI} M카드 (${CARD_TYPES.CREDIT})`,
    cardImage: card_images['0302'].m.m1,
    info: [
      { label: '날짜', value: '2024.10.20' },
      { label: '사용처', value: '삼겹살' },
      { label: '카테고리', value: '식비' },
      { label: '사용금액', value: '35,000' },
    ],
  },
  {
    id: '0303',
    title: `${CARD_COMPANIES.SAMSUNG}iD SIMPLE카드 (${CARD_TYPES.CREDIT})`,
    cardImage: card_images['0303'].id.id1,
    info: [
      { label: '날짜', value: '2024.10.20' },
      { label: '사용처', value: 'kg중국집' },
      { label: '카테고리', value: '식비' },
      { label: '사용금액', value: '12,000' },
    ],
  },
  {
    id: '0304',
    title: `${CARD_COMPANIES.NONGHYUP} 별다줄카드 (${CARD_TYPES.CREDIT})`,
    cardImage: card_images['0304'].byul.byul1,
    info: [
      { label: '날짜', value: '2024.10.20' },
      { label: '사용처', value: 'kg쌀국수' },
      { label: '카테고리', value: '식비' },
      { label: '사용금액', value: '8,000' },
    ],
  },
  {
    id: '0306',
    title: `${CARD_COMPANIES.SHINHAN} 처음카드 (${CARD_TYPES.CREDIT})`,
    cardImage: card_images['0306'].first.first1,
    info: [
      { label: '날짜', value: '2024.10.20' },
      { label: '사용처', value: 'kg쌀국수' },
      { label: '카테고리', value: '식비' },
      { label: '사용금액', value: '2,000' },
    ],
  },
];

// 모든 카드 데이터
export const cardMockData = [...registeredCardData];

export const getCardByCompany = (company) =>
  cardMockData.find((card) => card.cardTitle.includes(company));

export const getCardsByType = (type) =>
  cardMockData.filter((card) => card.cardTitle.includes(type));

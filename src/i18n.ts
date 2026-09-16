import type { Language, LocalizedText } from './types/pokemon'

export const ui = {
  en: {
    documentTitle: 'PokéGuess · Pokémon guessing game', metaDescription: 'Guess the mystery Pokémon by comparing its stats, type, generation, and evolution stage.', switchLanguage: 'Switch language',
    tagline: "Who's that Pokémon?", language: '中文', newPokemon: 'A new Pokémon awaits', title: 'Guess the mystery Pokémon!',
    instructions: 'Search the Pokédex, compare each clue, and find the answer in 10 guesses.',
    search: 'Enter a Pokémon...', loadingSearch: 'Loading Pokédex…', noResults: 'No unguessed Pokémon found',
    guesses: 'Guesses this round', streak: 'Win streak', streakHint: 'The streak resets after a missed round.',
    loading: 'Choosing a mystery Pokémon…', retry: 'Try again', guessError: 'That guess could not be loaded.', loadError: 'Something went wrong while loading the Pokédex.',
    emptyTitle: 'Your guesses will appear here', emptyText: 'Every badge is a clue. Green values are confirmed matches.',
    log: "Trainer's log", history: 'Guess history', match: 'Match', noMatch: 'No match', higher: 'Secret is higher', lower: 'Secret is lower',
    pokemon: 'Pokémon', types: 'Types', stats: 'Base Stats', generation: 'Generation', abilities: 'Abilities', evolution: 'Evolution', other: 'Other',
    total: 'Total', hp: 'HP', attack: 'ATK', defense: 'DEF', specialAttack: 'SpA', specialDefense: 'SpD', speed: 'SPE',
    hidden: 'Hidden Ability', stage: 'Stage', canEvolve: 'Can evolve', hasPreEvolution: 'Has pre-evolution',
    height: 'Height', weight: 'Weight', legendary: 'Legendary', mythical: 'Mythical', baby: 'Baby', color: 'Color', shape: 'Shape', habitat: 'Habitat',
    yes: 'Yes', no: 'No', mysterySolved: 'Mystery solved!', roundOver: 'Round over', found: 'You found', answerWas: 'The answer was',
    guess: 'guess', guessesWord: 'guesses', playAgain: 'Play Again', data: "Data from PokéAPI · Gotta guess 'em all!",
    exactLabel: 'Exact match', secretHigher: 'The secret Pokémon has a higher value', secretLower: 'The secret Pokémon has a lower value',
    openPokedex: 'Pokédex', closePokedex: 'Close Pokédex', pokedexTitle: 'National Pokédex',
    pokedexSubtitle: 'Browse and filter all Pokémon', pokedexSearch: 'Search Pokémon or number...',
    filters: 'Filters', all: 'All', special: 'Special', singleType: 'Single Type', dualType: 'Dual Type',
    resetFilters: 'Reset filters', pokemonFound: 'Pokémon found', loadingPokedex: 'Loading Pokédex...',
    pokedexError: 'Failed to load Pokédex. Please try again.', pokedexEmpty: 'No Pokémon match these filters.',
    backToPokedex: 'Back to Pokédex', useAsGuess: 'Use as Guess', detailLoading: 'Loading Pokémon details...',
    detailError: 'Failed to load Pokémon details.', unavailableDuringRoundEnd: 'Start a new round to use this Pokémon as a guess.',
    alreadyGuessed: 'This Pokémon has already been guessed this round.',
    description: 'Description', descriptionEnglishFallback: 'Official Chinese text is unavailable; showing the English entry.', unknown: 'Unknown',
  },
  zh: {
    documentTitle: 'PokéGuess · 猜宝可梦', metaDescription: '通过比较种族值、属性、世代和进化阶段，猜出神秘宝可梦。', switchLanguage: '切换语言',
    tagline: '猜猜我是谁？', language: '日本語', newPokemon: '新的宝可梦正在等待', title: '猜出神秘宝可梦！',
    instructions: '搜索宝可梦图鉴，逐一比较线索，并在 10 次内找到答案。',
    search: '输入宝可梦名称...', loadingSearch: '正在加载图鉴…', noResults: '没有找到未猜过的宝可梦',
    guesses: '本轮猜测次数', streak: '连续猜对次数', streakHint: '本轮失败后连胜次数会重置。',
    loading: '正在选择神秘宝可梦…', retry: '重试', guessError: '无法加载这次猜测。', loadError: '加载宝可梦图鉴时出现问题。',
    emptyTitle: '你的猜测会显示在这里', emptyText: '每个标签都是线索，绿色表示完全匹配。',
    log: '训练家记录', history: '猜测记录', match: '匹配', noMatch: '不匹配', higher: '答案更高', lower: '答案更低',
    pokemon: '宝可梦', types: '属性', stats: '种族值', generation: '世代', abilities: '特性', evolution: '进化', other: '其他',
    total: '总和', hp: 'HP', attack: '攻击', defense: '防御', specialAttack: '特攻', specialDefense: '特防', speed: '速度',
    hidden: '隐藏特性', stage: '阶段', canEvolve: '还能进化', hasPreEvolution: '有进化前形态',
    height: '身高', weight: '体重', legendary: '传说宝可梦', mythical: '幻之宝可梦', baby: '幼年宝可梦', color: '颜色', shape: '外形', habitat: '栖息地',
    yes: '是', no: '否', mysterySolved: '猜对了！', roundOver: '本轮结束', found: '你找到了', answerWas: '正确答案是',
    guess: '次猜测', guessesWord: '次猜测', playAgain: '再来一局', data: '数据来源：PokéAPI · 全部猜出来吧！',
    exactLabel: '完全匹配', secretHigher: '神秘宝可梦的数值更高', secretLower: '神秘宝可梦的数值更低',
    openPokedex: '全国图鉴', closePokedex: '关闭全国图鉴', pokedexTitle: '全国图鉴', pokedexSubtitle: '浏览并筛选所有宝可梦',
    pokedexSearch: '搜索宝可梦、编号……', filters: '筛选', all: '全部', special: '特殊', singleType: '单属性', dualType: '双属性',
    resetFilters: '重置筛选', pokemonFound: '只宝可梦', loadingPokedex: '正在加载全国图鉴……',
    pokedexError: '图鉴加载失败，请重试。', pokedexEmpty: '没有符合当前筛选条件的宝可梦。',
    backToPokedex: '返回图鉴', useAsGuess: '用它猜测', detailLoading: '正在加载宝可梦详情……', detailError: '宝可梦详情加载失败。',
    unavailableDuringRoundEnd: '开始新一局后才能用它猜测。',
    alreadyGuessed: '本轮已经猜过这只宝可梦。',
    description: '官方描述', descriptionEnglishFallback: '暂无官方中文描述，以下显示英文原文。', unknown: '未知',
  },
  ja: {
    documentTitle: 'PokéGuess・ポケモン当てゲーム', metaDescription: '種族値、タイプ、世代、進化段階を比べて謎のポケモンを当てよう。', switchLanguage: '言語を切り替える',
    tagline: 'だーれだ？', language: 'English', newPokemon: '新たなポケモンが待っている', title: '謎のポケモンを当てよう！',
    instructions: 'ポケモン図鑑を検索し、ヒントを比べて10回以内に答えを見つけよう。',
    search: 'ポケモンの名前を入力…', loadingSearch: 'ポケモン図鑑を読み込み中…', noResults: '未回答のポケモンが見つかりません',
    guesses: '今回の予想', streak: '連勝', streakHint: '失敗すると連勝記録がリセットされます。',
    loading: '謎のポケモンを選んでいます…', retry: 'もう一度試す', guessError: 'そのポケモンを読み込めませんでした。', loadError: 'ポケモン図鑑の読み込み中に問題が発生しました。',
    emptyTitle: 'ここに予想が表示されます', emptyText: 'すべてのバッジがヒントです。緑色は完全一致を表します。',
    log: 'トレーナーメモ', history: '予想履歴', match: '一致', noMatch: '不一致', higher: '答えの数値が高い', lower: '答えの数値が低い',
    pokemon: 'ポケモン', types: 'タイプ', stats: '種族値', generation: '世代', abilities: '特性', evolution: '進化', other: 'その他',
    total: '合計', hp: 'HP', attack: 'こうげき', defense: 'ぼうぎょ', specialAttack: 'とくこう', specialDefense: 'とくぼう', speed: 'すばやさ',
    hidden: '隠れ特性', stage: '進化段階', canEvolve: '進化できる', hasPreEvolution: '進化前がいる',
    height: '高さ', weight: '重さ', legendary: '伝説のポケモン', mythical: '幻のポケモン', baby: 'ベイビィポケモン', color: '色', shape: '姿', habitat: '生息地',
    yes: 'はい', no: 'いいえ', mysterySolved: '正解！', roundOver: 'ゲーム終了', found: '見つけた！', answerWas: '答えは',
    guess: '回の予想', guessesWord: '回の予想', playAgain: 'もう一度遊ぶ', data: 'データ提供：PokéAPI・めざせ全問正解！',
    exactLabel: '完全一致', secretHigher: '謎のポケモンの数値が高い', secretLower: '謎のポケモンの数値が低い',
    openPokedex: 'ポケモン図鑑', closePokedex: 'ポケモン図鑑を閉じる', pokedexTitle: '全国図鑑',
    pokedexSubtitle: 'すべてのポケモンを閲覧・絞り込み', pokedexSearch: '名前または図鑑番号で検索…',
    filters: '絞り込み', all: 'すべて', special: '特別', singleType: '単タイプ', dualType: '複合タイプ',
    resetFilters: '絞り込みをリセット', pokemonFound: '匹のポケモン', loadingPokedex: 'ポケモン図鑑を読み込み中…',
    pokedexError: 'ポケモン図鑑を読み込めませんでした。もう一度お試しください。', pokedexEmpty: '条件に一致するポケモンがいません。',
    backToPokedex: '図鑑に戻る', useAsGuess: 'このポケモンで予想', detailLoading: 'ポケモンの詳細を読み込み中…',
    detailError: 'ポケモンの詳細を読み込めませんでした。', unavailableDuringRoundEnd: '新しいゲームを始めると、このポケモンで予想できます。',
    alreadyGuessed: 'このポケモンはすでに今回の予想に使っています。',
    description: '図鑑説明', descriptionEnglishFallback: '公式の日本語説明がないため、英語の原文を表示しています。', unknown: '不明',
  },
} as const

export type Messages = (typeof ui)[Language]
export function localName(value: LocalizedText, language: Language): string { return value[language] || value.en }
export function secondaryName(value: LocalizedText, language: Language): string { return language === 'en' ? value.zh : value.en }
export function nextLanguage(language: Language): Language { return language === 'en' ? 'zh' : language === 'zh' ? 'ja' : 'en' }

const typeNames: Record<string, LocalizedText> = {
  normal: { en: 'Normal', zh: '一般', ja: 'ノーマル' }, fire: { en: 'Fire', zh: '火', ja: 'ほのお' }, water: { en: 'Water', zh: '水', ja: 'みず' }, electric: { en: 'Electric', zh: '电', ja: 'でんき' }, grass: { en: 'Grass', zh: '草', ja: 'くさ' }, ice: { en: 'Ice', zh: '冰', ja: 'こおり' },
  fighting: { en: 'Fighting', zh: '格斗', ja: 'かくとう' }, poison: { en: 'Poison', zh: '毒', ja: 'どく' }, ground: { en: 'Ground', zh: '地面', ja: 'じめん' }, flying: { en: 'Flying', zh: '飞行', ja: 'ひこう' }, psychic: { en: 'Psychic', zh: '超能力', ja: 'エスパー' }, bug: { en: 'Bug', zh: '虫', ja: 'むし' },
  rock: { en: 'Rock', zh: '岩石', ja: 'いわ' }, ghost: { en: 'Ghost', zh: '幽灵', ja: 'ゴースト' }, dragon: { en: 'Dragon', zh: '龙', ja: 'ドラゴン' }, dark: { en: 'Dark', zh: '恶', ja: 'あく' }, steel: { en: 'Steel', zh: '钢', ja: 'はがね' }, fairy: { en: 'Fairy', zh: '妖精', ja: 'フェアリー' },
}

const categoryNames: Record<string, LocalizedText> = {
  red: { en: 'Red', zh: '红色', ja: '赤' }, blue: { en: 'Blue', zh: '蓝色', ja: '青' }, yellow: { en: 'Yellow', zh: '黄色', ja: '黄' }, green: { en: 'Green', zh: '绿色', ja: '緑' }, black: { en: 'Black', zh: '黑色', ja: '黒' }, brown: { en: 'Brown', zh: '棕色', ja: '茶色' },
  purple: { en: 'Purple', zh: '紫色', ja: '紫' }, gray: { en: 'Gray', zh: '灰色', ja: '灰色' }, white: { en: 'White', zh: '白色', ja: '白' }, pink: { en: 'Pink', zh: '粉色', ja: 'ピンク' }, cave: { en: 'Cave', zh: '洞穴', ja: '洞窟' }, forest: { en: 'Forest', zh: '森林', ja: '森' },
  grassland: { en: 'Grassland', zh: '草原', ja: '草原' }, mountain: { en: 'Mountain', zh: '山地', ja: '山岳' }, rare: { en: 'Rare', zh: '稀有地区', ja: '希少な地域' }, sea: { en: 'Sea', zh: '海洋', ja: '海' }, roughTerrain: { en: 'Rough Terrain', zh: '崎岖地形', ja: '荒地' },
  urban: { en: 'Urban', zh: '城市', ja: '市街地' }, watersEdge: { en: 'Waterside', zh: '水边', ja: '水辺' },
  ball: { en: 'Ball', zh: '球形', ja: '球形' }, squiggle: { en: 'Squiggle', zh: '蛇形', ja: '蛇形' }, fish: { en: 'Fish', zh: '鱼形', ja: '魚形' }, arms: { en: 'Armed', zh: '有手臂', ja: '腕のある姿' },
  blob: { en: 'Blob', zh: '团块状', ja: '不定形' }, upright: { en: 'Upright', zh: '直立形', ja: '直立形' }, legs: { en: 'Legged', zh: '多足形', ja: '多足形' }, quadruped: { en: 'Quadruped', zh: '四足形', ja: '四足形' },
  wings: { en: 'Winged', zh: '有翅膀', ja: '翼のある姿' }, tentacles: { en: 'Tentacled', zh: '有触手', ja: '触手形' }, heads: { en: 'Multiple heads', zh: '多头形', ja: '多頭形' }, humanoid: { en: 'Humanoid', zh: '人形', ja: '人型' },
  bugWings: { en: 'Bug wings', zh: '虫翼形', ja: '虫の羽' }, armor: { en: 'Armored', zh: '铠甲形', ja: '鎧形' },
}

export function translatedType(id: string, language: Language): string { return typeNames[id]?.[language] ?? id }
export function translatedCategory(id: string, language: Language): string {
  const key = id.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
  return categoryNames[key]?.[language] ?? id.split('-').map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ')
}
export function generationLabel(generation: number, language: Language): string {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][generation - 1] ?? String(generation)
  if (language === 'zh') return `第${['一', '二', '三', '四', '五', '六', '七', '八', '九'][generation - 1] ?? generation}世代`
  if (language === 'ja') return `第${generation}世代`
  return `Generation ${roman}`
}

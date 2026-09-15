import type { Language, LocalizedText } from './types/pokemon'

export const ui = {
  en: {
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
  },
  zh: {
    tagline: '猜猜我是谁？', language: 'English', newPokemon: '新的宝可梦正在等待', title: '猜出神秘宝可梦！',
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
  },
} as const

export type Messages = (typeof ui)[Language]
export function localName(value: LocalizedText, language: Language): string { return value[language] || value.en }

const typeNames: Record<string, LocalizedText> = {
  normal: { en: 'Normal', zh: '一般' }, fire: { en: 'Fire', zh: '火' }, water: { en: 'Water', zh: '水' }, electric: { en: 'Electric', zh: '电' }, grass: { en: 'Grass', zh: '草' }, ice: { en: 'Ice', zh: '冰' },
  fighting: { en: 'Fighting', zh: '格斗' }, poison: { en: 'Poison', zh: '毒' }, ground: { en: 'Ground', zh: '地面' }, flying: { en: 'Flying', zh: '飞行' }, psychic: { en: 'Psychic', zh: '超能力' }, bug: { en: 'Bug', zh: '虫' },
  rock: { en: 'Rock', zh: '岩石' }, ghost: { en: 'Ghost', zh: '幽灵' }, dragon: { en: 'Dragon', zh: '龙' }, dark: { en: 'Dark', zh: '恶' }, steel: { en: 'Steel', zh: '钢' }, fairy: { en: 'Fairy', zh: '妖精' },
}

const categoryNames: Record<string, LocalizedText> = {
  red: { en: 'Red', zh: '红色' }, blue: { en: 'Blue', zh: '蓝色' }, yellow: { en: 'Yellow', zh: '黄色' }, green: { en: 'Green', zh: '绿色' }, black: { en: 'Black', zh: '黑色' }, brown: { en: 'Brown', zh: '褐色' },
  purple: { en: 'Purple', zh: '紫色' }, gray: { en: 'Gray', zh: '灰色' }, white: { en: 'White', zh: '白色' }, pink: { en: 'Pink', zh: '粉色' }, cave: { en: 'Cave', zh: '洞穴' }, forest: { en: 'Forest', zh: '森林' },
  grassland: { en: 'Grassland', zh: '草原' }, mountain: { en: 'Mountain', zh: '山地' }, rare: { en: 'Rare', zh: '稀有地点' }, sea: { en: 'Sea', zh: '海洋' }, roughTerrain: { en: 'Rough terrain', zh: '崎岖地形' },
  urban: { en: 'Urban', zh: '城市' }, watersEdge: { en: "Water's edge", zh: '水边' },
  ball: { en: 'Ball', zh: '球形' }, squiggle: { en: 'Squiggle', zh: '蛇形' }, fish: { en: 'Fish', zh: '鱼形' }, arms: { en: 'Armed', zh: '有手臂' },
  blob: { en: 'Blob', zh: '团块状' }, upright: { en: 'Upright', zh: '直立形' }, legs: { en: 'Legged', zh: '多足形' }, quadruped: { en: 'Quadruped', zh: '四足形' },
  wings: { en: 'Winged', zh: '有翅膀' }, tentacles: { en: 'Tentacled', zh: '有触手' }, heads: { en: 'Multiple heads', zh: '多头形' }, humanoid: { en: 'Humanoid', zh: '人形' },
  bugWings: { en: 'Bug wings', zh: '虫翼形' }, armor: { en: 'Armored', zh: '铠甲形' },
}

export function translatedType(id: string, language: Language): string { return typeNames[id]?.[language] ?? id }
export function translatedCategory(id: string, language: Language): string {
  const key = id.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
  return categoryNames[key]?.[language] ?? id.split('-').map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ')
}
export function generationLabel(generation: number, language: Language): string {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][generation - 1] ?? String(generation)
  return language === 'zh' ? `第${['一', '二', '三', '四', '五', '六', '七', '八', '九'][generation - 1] ?? generation}世代` : `Generation ${roman}`
}

export const REPEAT_RULES = ['daily', 'weekdays', 'weekly'] as const

export type RepeatRule = (typeof REPEAT_RULES)[number]

export const REPEAT_LABEL: Record<RepeatRule, string> = {
  daily: '毎日',
  weekdays: '平日',
  weekly: '毎週',
}

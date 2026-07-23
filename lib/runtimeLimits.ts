/**
 * Production resource ceilings — single source of truth for scripts and reports.
 */
export const RUNTIME_LIMITS = {
  dockerImageMb: 400,
  containerTotalMb: 1024,
  writableLayerMb: 300,
  nextDirMb: 500,
  cacheMb: 100,
  imageCacheMb: 100,
  logsMb: 50,
  tmpMb: 50,
  idleRamMb: 200,
  idleCpuPercent: 2,
  maxOldSpaceMb: 384,
  cleanupIntervalHours: 12,
  monitorIntervalSeconds: 60,
} as const;

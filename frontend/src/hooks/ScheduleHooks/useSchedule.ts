import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createScheduleOverride,
  deleteScheduleOverride,
  createWeeklySchedule,
  deleteWeeklySchedule,
  getScheduleOverrides,
  getWeeklySchedules,
  updateWeeklySchedule,
  updateScheduleOverride,
  type ScheduleFilters,
} from "../../services/scheduleApi"
import type { WeeklyScheduleInput } from "../../types/WeeklySchedule"
import type { ScheduleOverrideInput } from "../../types/ScheduleOverride"

export const useWeeklySchedules = (filters: ScheduleFilters = {}) => {
  return useQuery({
    queryKey: ["weeklySchedules", filters.classId ?? null, filters.classroomId ?? null],
    queryFn: () => getWeeklySchedules(filters),
  })
}

export const useScheduleOverrides = () => {
  return useQuery({
    queryKey: ["scheduleOverrides"],
    queryFn: getScheduleOverrides,
  })
}

export const useCreateWeeklySchedule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (schedule: WeeklyScheduleInput) => createWeeklySchedule(schedule),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["weeklySchedules"] }),
  })
}

export const useUpdateWeeklySchedule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, schedule }: { id: number; schedule: WeeklyScheduleInput }) => updateWeeklySchedule(id, schedule),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["weeklySchedules"] }),
  })
}

export const useDeleteWeeklySchedule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWeeklySchedule,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["weeklySchedules"] }),
  })
}

export const useCreateScheduleOverride = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createScheduleOverride,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scheduleOverrides"] }),
  })
}

export const useUpdateScheduleOverride = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, override }: { id: number; override: ScheduleOverrideInput }) => updateScheduleOverride(id, override),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scheduleOverrides"] }),
  })
}

export const useDeleteScheduleOverride = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteScheduleOverride,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scheduleOverrides"] }),
  })
}

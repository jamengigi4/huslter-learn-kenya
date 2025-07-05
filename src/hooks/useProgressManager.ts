import { useState, useEffect } from 'react';

interface UserProgress {
  [courseId: string]: {
    completedLessons: number[];
    unlockedLessons: number[];
    hasAccess: boolean;
    accessCode?: string;
  };
}

export const useProgressManager = (courseId: string) => {
  const [progress, setProgress] = useState<UserProgress>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('microlearning_progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    } else {
      // Initialize with lesson 1 unlocked for free courses
      const initialProgress = {
        [courseId]: {
          completedLessons: [],
          unlockedLessons: [1],
          hasAccess: true, // For free courses
        }
      };
      setProgress(initialProgress);
      localStorage.setItem('microlearning_progress', JSON.stringify(initialProgress));
    }
  }, [courseId]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem('microlearning_progress', JSON.stringify(progress));
    }
  }, [progress]);

  const getCurrentProgress = () => {
    return progress[courseId] || {
      completedLessons: [],
      unlockedLessons: [1],
      hasAccess: true,
    };
  };

  const markLessonComplete = (lessonId: number) => {
    const currentProgress = getCurrentProgress();
    const newCompletedLessons = [...currentProgress.completedLessons, lessonId];
    const newUnlockedLessons = [...currentProgress.unlockedLessons];
    
    // Unlock next lesson if not already unlocked
    const nextLessonId = lessonId + 1;
    if (!newUnlockedLessons.includes(nextLessonId)) {
      newUnlockedLessons.push(nextLessonId);
    }

    setProgress(prev => ({
      ...prev,
      [courseId]: {
        ...currentProgress,
        completedLessons: newCompletedLessons,
        unlockedLessons: newUnlockedLessons,
      }
    }));
  };

  const isLessonUnlocked = (lessonId: number) => {
    const currentProgress = getCurrentProgress();
    return currentProgress.unlockedLessons.includes(lessonId);
  };

  const isLessonCompleted = (lessonId: number) => {
    const currentProgress = getCurrentProgress();
    return currentProgress.completedLessons.includes(lessonId);
  };

  const hasAccess = () => {
    const currentProgress = getCurrentProgress();
    return currentProgress.hasAccess;
  };

  const grantAccess = (accessCode: string) => {
    const currentProgress = getCurrentProgress();
    setProgress(prev => ({
      ...prev,
      [courseId]: {
        ...currentProgress,
        hasAccess: true,
        accessCode: accessCode,
      }
    }));
  };

  const getCompletedCount = () => {
    const currentProgress = getCurrentProgress();
    return currentProgress.completedLessons.length;
  };

  const resetProgress = () => {
    setProgress(prev => ({
      ...prev,
      [courseId]: {
        completedLessons: [],
        unlockedLessons: [1],
        hasAccess: true,
      }
    }));
  };

  return {
    getCurrentProgress,
    markLessonComplete,
    isLessonUnlocked,
    isLessonCompleted,
    hasAccess,
    grantAccess,
    getCompletedCount,
    resetProgress,
  };
};
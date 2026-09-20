"use client";

import { Table, Button } from '@heroui/react';
import Link from 'next/link';
import {
  FiEye, FiLock, FiDollarSign, FiUnlock,
  FiInfo, FiHeart, FiBookOpen, FiPlus, FiGrid, FiList, FiCalendar
} from 'react-icons/fi';
import { EditLessonsFormWithModal } from '@/components/dashboard/EditLessonsFormWithModal';
import { DeleteLessonWithModal } from '@/components/dashboard/DeleteLessonWithModal';
import { AiOutlineLike } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getFavoritesByLessonId } from '@/lib/api/favorites';

const LessonsTable = ({ lessons = [], user }) => {
  const [favoriteCount, setFavoriteCount] = useState({});
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  useEffect(() => {
    const fetchFavoriteLessons = async () => {
      lessons.forEach(async (lesson) => {
        if (!lesson._id) return;
        const { totalFavorite } = await getFavoritesByLessonId(lesson._id);
        setFavoriteCount((prev) => ({
          ...prev,
          [lesson._id]: totalFavorite || 0,
        }));
      });
    };
    if (lessons.length > 0) {
      fetchFavoriteLessons();
    }
  }, [lessons]);

  const renderDate = (createdAt) => {
    const dateStr = createdAt?.$date || createdAt;
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full bg-white/4 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40 overflow-hidden">

      {/* Header, Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            My Lessons — <span className="text-purple-400">Wisdom Logs</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Auditing and managing your personal experiences and logs.
          </p>
        </div>

        {/* Top Right Action Group */}
        <div className="flex flex-wrap items-center gap-3 justify-between sm:justify-end">
          
          {/* Dual View Switcher Toggle */}
          <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              title="Table View"
            >
              <FiList className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              title="Grid Cards View"
            >
              <FiGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>

          <div className="text-xs px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70">
            Total: <span className="text-purple-400 font-bold">{lessons.length}</span>
          </div>

          {/* + Write New Lesson Button */}
          <Link
            href="/dashboard/add-lesson"
            className="px-4 h-9 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-500/20 hover:opacity-95 transition-all active:scale-[0.98] flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>Write New Lesson</span>
          </Link>
        </div>
      </div>

      {/* VIEW MODE 1: TABLE VIEW */}
      {viewMode === 'table' ? (
        <Table aria-label="Wisdom Vault Records" className="w-full">
          <Table.ScrollContainer className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <Table.Content className="min-w-206">
              <Table.Header>
                <Table.Column isRowHeader className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider rounded-l-xl">Lesson Log Info</Table.Column>
                <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider">Visibility</Table.Column>
                <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider">Access Level</Table.Column>
                <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider">Engagement</Table.Column>
                <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider">Created At</Table.Column>
                <Table.Column className="bg-white/5 text-white/80 font-bold text-xs uppercase tracking-wider rounded-r-xl text-right">Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {lessons.map((lesson, index) => (
                  <Table.Row key={lesson._id?.$oid || lesson._id || index} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <Table.Cell className="py-4">
                      <div className="flex items-start gap-3 max-w-sm">
                        <div className="mt-1 p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                          <FiBookOpen className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-white truncate capitalize">
                            {lesson.lessonTitle}
                          </p>
                          <p className="text-[11px] text-white/50 font-medium mt-1 flex items-center gap-1.5 flex-wrap">
                            <span className="capitalize">{lesson.category?.replace('-', ' ')}</span>
                            <span className="text-purple-500/80">•</span>
                            <span className="capitalize text-purple-400">{lesson.emotionalTone}</span>
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border bg-white/5 border-white/10 text-white">
                        {lesson.visibility === 'public' ? (
                          <>
                            <FiEye className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Public</span>
                          </>
                        ) : (
                          <>
                            <FiLock className="w-3 h-3 text-amber-400" />
                            <span className="text-amber-400">Private</span>
                          </>
                        )}
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${lesson.accessLevel === 'premium' ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' : 'bg-white/5 border-white/10 text-white/80'}`}>
                        {lesson.accessLevel === 'premium' ? (
                          <>
                            <FiDollarSign className="w-3 h-3 text-purple-400" />
                            <span className="text-purple-300 font-semibold">Premium</span>
                          </>
                        ) : (
                          <>
                            <FiUnlock className="w-3 h-3 text-white/50" />
                            <span className="text-white/70">Free</span>
                          </>
                        )}
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-4 text-white/60 text-xs">
                        <div className="flex items-center gap-1" title="Reactions/Likes">
                          <AiOutlineLike className="w-3.5 h-3.5 text-rose-400/80" />
                          <span>{lesson.likesCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Favorites">
                          <FiHeart className="w-3.5 h-3.5 text-sky-400/80" />
                          <span>{favoriteCount[lesson._id] || 0}</span>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-xs text-white/60 font-medium">
                        {renderDate(lesson.createdAt)}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/public-lessons/${lesson._id}`}>
                          <Button title="View Details" size="sm" isIconOnly className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl h-8 w-8 cursor-pointer">
                            <FiInfo className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <EditLessonsFormWithModal lesson={lesson} user={user} />
                        <DeleteLessonWithModal lesson={lesson} />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      ) : (
        /* VIEW MODE 2: GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-[#0e0826]/80 border border-white/10 hover:border-purple-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 backdrop-blur-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                    {lesson.category?.replace('-', ' ')}
                  </span>

                  <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg border ${
                    lesson.accessLevel === 'premium'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                  }`}>
                    {lesson.accessLevel || 'Free'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {lesson.lessonTitle}
                </h3>

                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {lesson.lessonDescription || "No description provided."}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="flex items-center gap-1 text-[11px]">
                    <FiCalendar className="w-3 h-3 text-purple-400" />
                    {renderDate(lesson.createdAt)}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-rose-300">
                      <AiOutlineLike className="w-3.5 h-3.5" /> {lesson.likesCount || 0}
                    </span>
                    <span className="flex items-center gap-1 text-sky-300">
                      <FiHeart className="w-3.5 h-3.5" /> {favoriteCount[lesson._id] || 0}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <Link href={`/public-lessons/${lesson._id}`} className="flex-1">
                    <Button size="sm" className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded-xl h-8 flex items-center justify-center gap-1 cursor-pointer">
                      <FiInfo className="w-3.5 h-3.5 text-purple-400" />
                      <span>Details</span>
                    </Button>
                  </Link>
                  <EditLessonsFormWithModal lesson={lesson} user={user} />
                  <DeleteLessonWithModal lesson={lesson} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonsTable;
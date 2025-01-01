'use client'

import styles from '@/styles/dashboard/DashboardCards.module.css'
import { FiFolder, FiCalendar, FiCheckSquare, FiClock, FiBell, FiEye, FiUser } from 'react-icons/fi'

// 알림 타입 정의
type Notification = {
  id: number;
  type: 'meeting' | 'deadline' | 'alert';
  title: string;
  time: string;
  description?: string;
}

// 리뷰 데이터 타입 정의
type Review = {
  id: number;
  title: string;
  project: string;
  projectId: number;
  type: 'video' | 'design';
  status: 'pending' | 'in_review' | 'approved' | 'retake';
  deadline: string;
  reviewer: string;
}

// 프로그레스 바 색상 결정 함수
const getProgressColor = (progress: number) => {
  if (progress >= 75) return 'var(--progress-high)' // 빨간색
  if (progress >= 40) return 'var(--progress-medium)' // 노란색
  return 'var(--progress-low)' // 초록색
}

export default function DashboardCards() {
  // 진행중인 프로젝트 데이터
  const projects = [
    { id: 1, name: "NewJeans 'Super Shy' MV Post", progress: 75 },
    { id: 2, name: "Nike 'Just Do It 2024' TVC", progress: 30 },
    { id: 3, name: "IU 'Love Wins' MV Color", progress: 50 },
    { id: 4, name: "Samsung 'Galaxy S24' Campaign", progress: 20 },
    { id: 5, name: "LE SSERAFIM 'EASY' VFX", progress: 60 }
  ]

  // 장비/시설 예약 현황
  const reservations = [
    { id: 1, type: "편집실", name: "Suite A", time: "13:00-17:00" },
    { id: 2, type: "녹음실", name: "Studio 1", time: "15:00-16:00" },
    { id: 3, type: "워크스테이션", name: "DaVinci 2", time: "09:00-18:00" }
  ]

  // 할 일 목록 (프로젝트 연동)
  const todos = [
    { 
      id: 1, 
      task: "1차 러프컷 검토", 
      deadline: "오늘",
      project: "NewJeans 'Super Shy' MV Post",
      projectId: 1
    },
    { 
      id: 2, 
      task: "사운드 에셋 전달", 
      deadline: "내일",
      project: "Nike 'Just Do It 2024' TVC",
      projectId: 2
    },
    { 
      id: 3, 
      task: "VFX 슈퍼바이징", 
      deadline: "금요일",
      project: "LE SSERAFIM 'EASY' VFX",
      projectId: 5
    },
    { 
      id: 4, 
      task: "최종 컬러 그레이딩", 
      deadline: "다음주 월요일",
      project: "IU 'Love Wins' MV Color",
      projectId: 3
    }
  ]

  // 다음 일정 데이터 (프로젝트 연동)
  const upcomingEvents = [
    { 
      id: 1, 
      type: 'meeting',
      title: '클라이언트 피드백 미팅', 
      time: '오늘 14:00',
      description: '편집실 A',
      project: "NewJeans 'Super Shy' MV Post",
      projectId: 1
    },
    { 
      id: 2, 
      type: 'deadline',
      title: '1차 컷 제출 마감', 
      time: '내일 17:00',
      description: '에이전시 피드백',
      project: "Nike 'Just Do It 2024' TVC",
      projectId: 2
    },
    { 
      id: 3, 
      type: 'alert',
      title: '렌더팜 작업 완료', 
      time: '방금 전',
      description: 'VFX 시퀀스 #23-27',
      project: "LE SSERAFIM 'EASY' VFX",
      projectId: 5
    }
  ]

  // 리뷰 데이터
  const reviews: Review[] = [
    {
      id: 1,
      title: "1차 러프컷",
      project: "NewJeans 'Super Shy' MV Post",
      projectId: 1,
      type: 'video',
      status: 'in_review',
      deadline: 'Today 18:00',
      reviewer: 'Director Kim'
    },
    {
      id: 2,
      title: "메인 캠페인 디자인",
      project: "Samsung 'Galaxy S24' Campaign",
      projectId: 4,
      type: 'design',
      status: 'retake',
      deadline: 'Tomorrow 13:00',
      reviewer: 'Creative Dir. Lee'
    },
    {
      id: 3,
      title: "VFX 1차 시안",
      project: "LE SSERAFIM 'EASY' VFX",
      projectId: 5,
      type: 'video',
      status: 'approved',
      deadline: 'Completed',
      reviewer: 'VFX Sup. Park'
    },
    {
      id: 4,
      title: "VFX 1차 시안",
      project: "LE SSERAFIM 'EASY' VFX",
      projectId: 5,
      type: 'video',
      status: 'pending',
      deadline: 'Today 18:00',
      reviewer: 'Director Kim'
    }
  ]

  // 상태에 따른 배지 색상
  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'pending': return 'var(--progress-low)' // 초록색
      case 'in_review': return 'var(--progress-medium)' // 노란색
      case 'approved': return 'var(--theme-blue)' // 파란색
      case 'retake': return 'var(--progress-high)' // 빨간색
      default: return 'var(--theme-blue)'
    }
  }

  // 상태 텍스트
  const getStatusText = (status: Review['status']) => {
    switch (status) {
      case 'pending': return 'Pending'
      case 'in_review': return 'In Review'
      case 'approved': return 'Approved'
      case 'retake': return 'Retake'
      default: return ''
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Overview</h2>
          <div className={styles.cardIcon}>
            <FiBell className="text-white text-xl" />
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.notificationList}>
            {upcomingEvents.map(event => (
              <div key={event.id} className={styles.notificationItem}>
                <div className={styles.notificationTime}>
                  <FiClock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className={styles.notificationContent}>
                  <span className={styles.notificationTitle}>{event.title}</span>
                  <span className={styles.notificationProject}>{event.project}</span>
                  {event.description && (
                    <span className={styles.notificationDescription}>
                      {event.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <span className={styles.cardCount}>{projects.length}</span>
            Active Projects
          </h2>
          <div className={styles.cardIcon}>
            <FiFolder className="text-white text-xl" />
          </div>
        </div>
        <div className={`${styles.cardContent} ${styles.projectList}`}>
          {projects.map((project, index) => (
            <div key={project.id} className={styles.projectItem} style={{
              opacity: Math.max(1 - (index * 0.2), 0.2)
            }}>
              <div className={styles.projectInfo}>
                <span className={styles.projectName}>{project.name}</span>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: getProgressColor(project.progress)
                    }}
                  />
                </div>
              </div>
              <span className={styles.progressText}>{project.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <span className={styles.cardCount}>{reservations.length}</span>
            Reservations
          </h2>
          <div className={styles.cardIcon}>
            <FiCalendar className="text-white text-xl" />
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.reservationList}>
            {reservations.map(res => (
              <div key={res.id} className={styles.reservationItem}>
                <div className={styles.reservationType}>{res.type}</div>
                <div className={styles.reservationInfo}>
                  <span className={styles.reservationName}>{res.name}</span>
                  <span className={styles.reservationTime}>{res.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addButton}>+ New Reservation</button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Todo</h2>
          <div className={styles.cardIcon}>
            <FiCheckSquare className="text-white text-xl" />
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.todoList}>
            {todos.map(todo => (
              <div key={todo.id} className={styles.todoItem}>
                <div className={styles.todoCheckbox} />
                <div className={styles.todoInfo}>
                  <span className={styles.todoTask}>{todo.task}</span>
                  <span className={styles.todoProject}>{todo.project}</span>
                  <span className={styles.todoDeadline}>{todo.deadline}</span>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addButton}>+ New Task</button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <span className={styles.cardCount}>{reviews.length}</span>
            Reviews
          </h2>
          <div className={styles.cardIcon}>
            <FiEye className="text-white text-xl" />
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.reviewList}>
            {reviews.map(review => (
              <div key={review.id} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewType}>
                    {review.type === 'video' ? '🎬' : '🎨'}
                  </div>
                  <div 
                    className={styles.reviewStatus}
                    style={{ backgroundColor: getStatusColor(review.status) }}
                  >
                    {getStatusText(review.status)}
                  </div>
                </div>
                <div className={styles.reviewInfo}>
                  <span className={styles.reviewTitle}>{review.title}</span>
                  <span className={styles.reviewProject}>{review.project}</span>
                  <div className={styles.reviewMeta}>
                    <span className={styles.reviewDeadline}>
                      <FiClock className="w-3 h-3" />
                      {review.deadline}
                    </span>
                    <span className={styles.reviewReviewer}>
                      <FiUser className="w-3 h-3" />
                      {review.reviewer}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addButton}>+ New Review</button>
        </div>
      </div>
    </div>
  )
} 
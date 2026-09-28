import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, parse, eachDayOfInterval, getDay, getMonth } from 'date-fns';
import './CodingActivity.css';

const CodingActivity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    github: 0,
    leetcode: 0,
    activeDays: 0,
    total: 0
  });

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const API_URL = "https://activity-tracker-761d.onrender.com/api/activity";
        
        let apiData = [];
        const res = await fetch(API_URL);
        if (res.ok) {
          apiData = await res.json();
        } else {
          apiData = [
            { date: "Jan 1", total: 0, github: 0, leetcode: 0 },
            { date: "Jan 2", total: 5, github: 2, leetcode: 3 }
          ];
        }

        let ghCount = 0;
        let lcCount = 0;
        let activeDays = 0;
        let totalAll = 0;
        const year = 2026;

        const activityMap = new Map();

        apiData.forEach(item => {
          const parsedDate = parse(item.date, 'MMM d', new Date(year, 0, 1));
          const dateStr = format(parsedDate, 'yyyy-MM-dd');
          const totalCount = item.total || (item.github + item.leetcode);
          
          ghCount += item.github;
          lcCount += item.leetcode;
          totalAll += totalCount;
          if (totalCount > 0) activeDays++;

          activityMap.set(dateStr, {
            count: totalCount,
            github: item.github,
            leetcode: item.leetcode
          });
        });

        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        const daysInterval = eachDayOfInterval({ start: startDate, end: endDate });

        // Build grid
        const blocks = [];
        let col = 0;
        let prevMonth = 0;

        // Month labels
        const monthLabels = [];

        daysInterval.forEach((dayObj, index) => {
          const dateStr = format(dayObj, 'yyyy-MM-dd');
          const m = getMonth(dayObj);
          const dow = getDay(dayObj); // 0 = Sun, 1 = Mon ... 6 = Sat

          if (m !== prevMonth) {
            // New month! If not starting on Sunday, jump to next column
            if (dow !== 0) {
              col++;
            }
            prevMonth = m;
          }

          // Add month label if it's the first day of the month
          if (dayObj.getDate() === 1) {
            monthLabels.push({
              month: format(dayObj, 'MMM'),
              col: col
            });
          }

          const act = activityMap.get(dateStr) || { count: 0, github: 0, leetcode: 0 };
          
          let level = 0;
          if (act.count > 0 && act.count <= 3) level = 1;
          else if (act.count >= 4 && act.count <= 6) level = 2;
          else if (act.count >= 7 && act.count <= 9) level = 3;
          else if (act.count >= 10) level = 4;

          blocks.push({
            date: dateStr,
            dateLabel: format(dayObj, 'MMM d, yyyy'),
            col,
            row: dow,
            level,
            ...act
          });

          if (dow === 6) {
            col++;
          }
        });

        setData({ blocks, monthLabels, totalCols: col + 1 });
        setStats({
          github: ghCount,
          leetcode: lcCount,
          activeDays,
          total: totalAll
        });
      } catch (error) {
        console.error("Error fetching activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const getColor = (level) => {
    switch (level) {
      case 1: return 'var(--color-level-1)';
      case 2: return 'var(--color-level-2)';
      case 3: return 'var(--color-level-3)';
      case 4: return 'var(--color-level-4)';
      default: return 'var(--color-level-0)';
    }
  };

  const blockSize = 15;
  const blockMargin = 5;
  const cellSize = blockSize + blockMargin;
  
  // Calculate dimensions
  const totalCols = data.totalCols || 53;
  const width = totalCols * cellSize;
  const height = 7 * cellSize;
  const paddingLeft = 40;
  const paddingTop = 30;

  return (
    <section id="activity" className="coding-activity">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Activity
      </motion.h2>

      <motion.p
        className="coding-activity-desc"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        A combined heatmap of my open-source contributions and algorithmic problem-solving activity.
      </motion.p>

      {!loading && (
        <motion.div
          className="activity-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="stat-pill">
            GitHub <span>{stats.github}</span>
          </div>
          <div className="stat-pill">
            LeetCode <span>{stats.leetcode}</span>
          </div>
          <div className="stat-pill">
            Total active days <span>{stats.activeDays}</span>
          </div>
        </motion.div>
      )}

      <motion.div
        className="heatmap-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading activity data...</div>
        ) : data.blocks?.length > 0 ? (
          <div className="custom-calendar-wrapper">
            <svg 
              width={width + paddingLeft} 
              height={height + paddingTop + 30} 
              style={{ fontFamily: 'sans-serif', fontSize: '12px' }}
            >
              {/* Month Labels */}
              <g fill="var(--text-secondary, #888)">
                {data.monthLabels.map((ml, i) => (
                  <text key={i} x={paddingLeft + (ml.col * cellSize)} y={15}>
                    {ml.month}
                  </text>
                ))}
              </g>

              {/* Day Labels */}
              <g fill="var(--text-secondary, #888)">
                <text x={0} y={paddingTop + (1 * cellSize) + 12}>Mon</text>
                <text x={0} y={paddingTop + (3 * cellSize) + 12}>Wed</text>
                <text x={0} y={paddingTop + (5 * cellSize) + 12}>Fri</text>
              </g>

              {/* Blocks */}
              <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
                {data.blocks.map(b => (
                  <rect
                    key={b.date}
                    x={b.col * cellSize}
                    y={b.row * cellSize}
                    width={blockSize}
                    height={blockSize}
                    rx={2}
                    ry={2}
                    fill={getColor(b.level)}
                    style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
                    onMouseOver={(e) => e.target.style.stroke = '#fff'}
                    onMouseOut={(e) => e.target.style.stroke = 'none'}
                  >
                    <title>{`${b.dateLabel}\nLeetCode: ${b.leetcode}\nGitHub: ${b.github}`}</title>
                  </rect>
                ))}
              </g>

              {/* Footer info */}
              <g transform={`translate(${paddingLeft}, ${height + paddingTop + 20})`} fill="var(--text-secondary, #888)">
                <text x={0} y={0}>{stats.total} contributions in 2026</text>
                
                <g transform={`translate(${width - 150}, -10)`}>
                  <text x={0} y={10}>Less</text>
                  <rect x={35} y={0} width={blockSize} height={blockSize} rx={2} ry={2} fill={getColor(0)} />
                  <rect x={35 + cellSize} y={0} width={blockSize} height={blockSize} rx={2} ry={2} fill={getColor(1)} />
                  <rect x={35 + cellSize * 2} y={0} width={blockSize} height={blockSize} rx={2} ry={2} fill={getColor(2)} />
                  <rect x={35 + cellSize * 3} y={0} width={blockSize} height={blockSize} rx={2} ry={2} fill={getColor(3)} />
                  <rect x={35 + cellSize * 4} y={0} width={blockSize} height={blockSize} rx={2} ry={2} fill={getColor(4)} />
                  <text x={35 + cellSize * 5 + 5} y={10}>More</text>
                </g>
              </g>
            </svg>
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>No activity data available.</div>
        )}
      </motion.div>
    </section>
  );
};

export default CodingActivity;

import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Box, Typography, Paper, Card, CardContent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
import api from '../api/axios';

interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: string;
  due_date?: string;
}

const AgileBoard: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: Todo[] }>({
    BACKLOG: [],
    PENDING: [],
    IN_PROGRESS: [],
    COMPLETED: []
  });

  const fetchTodos = useCallback(async () => {
    try {
      const res = await api.get('/todos/', { params: { size: 100 } });
      const todos: Todo[] = res.data.items;
      const newColumns: { [key: string]: Todo[] } = {
        BACKLOG: [],
        PENDING: [],
        IN_PROGRESS: [],
        COMPLETED: []
      };
      todos.forEach(todo => {
        if (newColumns[todo.status]) {
          newColumns[todo.status].push(todo);
        } else if (todo.status === 'IN_PROGRESS') {
             // Handle case where backend might return IN_PROGRESS but we want to be safe
             newColumns.IN_PROGRESS.push(todo);
        } else {
            // Fallback for unknown status
             if(!newColumns['BACKLOG']) newColumns['BACKLOG'] = [];
             newColumns['BACKLOG'].push(todo);
        }
      });
      setColumns(newColumns);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodos();
  }, [fetchTodos]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = [...columns[source.droppableId]];
      const destColumn = [...columns[destination.droppableId]];
      const [removed] = sourceColumn.splice(source.index, 1);
      const newStatus = destination.droppableId;
      
      destColumn.splice(destination.index, 0, { ...removed, status: newStatus });
      
      setColumns({
        ...columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn
      });

      try {
        await api.put(`/todos/${removed._id}`, { status: newStatus });
      } catch (error) {
        console.error("Failed to update status", error);
        fetchTodos(); // Revert on error
      }
    } else {
      const column = [...columns[source.droppableId]];
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: column
      });
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'BACKLOG': return '#757575'; // Grey
      case 'PENDING': return '#ff9800'; // Orange
      case 'IN_PROGRESS': return '#03a9f4'; // Blue
      case 'COMPLETED': return '#4caf50'; // Green
      default: return '#757575';
    }
  };

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', p: 3, color: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 1 }}>
          Task Board
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey.500' }}>
          drag&drop
        </Typography>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', pb: 2 }}>
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Box key={columnId} sx={{ minWidth: 280, width: 300, flexShrink: 0 }}>
              <Paper 
                sx={{ 
                  p: 2, 
                  bgcolor: '#1e1e1e', 
                  minHeight: 500,
                  borderRadius: 2,
                  border: '1px solid #333'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {columnId.replace('_', ' ')}
                  </Typography>
                  <Box 
                    sx={{ 
                      bgcolor: getBadgeColor(columnId), 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: 24, 
                      height: 24, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {tasks.length}
                  </Box>
                </Box>

                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ minHeight: 400, display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      {tasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ 
                                bgcolor: '#2d2d2d', 
                                color: 'white',
                                borderRadius: 1,
                                border: '1px solid #404040',
                                '&:hover': {
                                  bgcolor: '#363636'
                                }
                              }}
                            >
                              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                                    {task.title}
                                  </Typography>
                                  <IconButton size="small" sx={{ color: 'white', p: 0.5, mt: -0.5, mr: -0.5 }}>
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                                
                                {task.description && (
                                  <Typography variant="body2" sx={{ color: 'grey.400', mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {task.description}
                                  </Typography>
                                )}

                                {task.due_date && (
                                  <Typography variant="caption" sx={{ color: 'grey.500', display: 'block' }}>
                                    Due: {format(new Date(task.due_date), 'M/d/yyyy')}
                                  </Typography>
                                )}
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default AgileBoard;

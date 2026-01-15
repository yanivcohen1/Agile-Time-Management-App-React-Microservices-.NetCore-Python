import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from './Dashboard';
import api from '../api/axios';
import { ThemeProvider, createTheme } from '@mui/material';

// Mock api
vi.mock('../api/axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

// Mock BarChart to avoid issues with jsdom and canvas
vi.mock('@mui/x-charts/BarChart', () => ({
  BarChart: () => <div data-testid="mock-bar-chart">Mock Bar Chart</div>,
}));

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Dashboard Component', () => {
  const statusData = {
    BACKLOG: 5,
    PENDING: 3,
    IN_PROGRESS: 2,
    COMPLETED: 10,
  };

  const workloadData = [
    {
      _id: '2026-01-15',
      total: 20,
      backlog: 5,
      pending: 3,
      in_progress: 2,
      completed: 10,
    }
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders "Main Status Board" title and status cards', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({ data: statusData });
    vi.mocked(api.get).mockResolvedValueOnce({ data: workloadData });

    renderWithTheme(<Dashboard />);

    expect(screen.getByText('Main Status Board')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Backlog')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('In progress')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  it('renders workload statistics correctly', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({ data: statusData });
    vi.mocked(api.get).mockResolvedValueOnce({ data: workloadData });

    renderWithTheme(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Dates by workload')).toBeInTheDocument();
      expect(screen.getByText('20 total')).toBeInTheDocument();
      expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument();
    });
  });
});

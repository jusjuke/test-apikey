import schedule from 'node-schedule';
import axios from 'axios';

const DAUM_URL = 'https://www.daum.net';
const SCHEDULE_INTERVAL = '*/2 * * * *'; // 2분마다 실행

interface SchedulerResponse {
  status: number;
  timestamp: string;
}

class DaumScheduler {
  private job: schedule.Job | null = null;

  // Daum 웹사이트 호출 함수
  private async callDaum(): Promise<SchedulerResponse> {
    try {
      const response = await axios.get(DAUM_URL);
      return {
        status: response.status,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('다음 호출 중 에러 발생:', error);
      throw error;
    }
  }

  // 스케줄러 시작
  public start(): void {
    if (this.job) {
      console.log('스케줄러가 이미 실행 중입니다.');
      return;
    }

    this.job = schedule.scheduleJob(SCHEDULE_INTERVAL, async () => {
      try {
        const result = await this.callDaum();
        console.log(`다음 호출 성공 - 상태코드: ${result.status}, 시간: ${result.timestamp}`);
      } catch (error) {
        console.error('스케줄 작업 실행 중 에러 발생:', error);
      }
    });

    console.log('스케줄러가 시작되었습니다. 2분마다 다음을 호출합니다.');
  }

  // 스케줄러 정지
  public stop(): void {
    if (!this.job) {
      console.log('실행 중인 스케줄러가 없습니다.');
      return;
    }

    this.job.cancel();
    this.job = null;
    console.log('스케줄러가 정지되었습니다.');
  }
}

export default DaumScheduler; 
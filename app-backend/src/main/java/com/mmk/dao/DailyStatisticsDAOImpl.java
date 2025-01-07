package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.dao.DailyStatisticsRepository;
import com.mmk.entity.DailyStatisticsEntity;

@Repository
public class DailyStatisticsDAOImpl implements DailyStatisticsDAO {

    @Autowired
    private DailyStatisticsRepository dailyStatisticsRepository;

    @Override
    public List<DailyStatisticsEntity> getDailyStatistics() {
        // Repository의 메서드를 호출해 데이터 처리
        return dailyStatisticsRepository.findAll();
    }
}

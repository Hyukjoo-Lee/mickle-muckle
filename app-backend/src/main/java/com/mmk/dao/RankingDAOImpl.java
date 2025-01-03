package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.RankingEntity;

@Repository
public class RankingDAOImpl implements RankingDAO {

    @Autowired
    private RankingRepository rankingRepo;

    @Override
    public List<RankingEntity> getAllRankings() {
        return rankingRepo.findAll();
    }
}

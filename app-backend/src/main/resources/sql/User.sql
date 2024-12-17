create sequence User_info_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence User_info_seq
nocache;

select * from User_info;
drop table User_info;

insert into User_info (user_id, username, name, password, created_at, update_at, email, address, spending_target) values (User_info_seq.NEXTVAL, 'jh_ID' ,'김지훈', '1234', sysdate, sysdate, 'jh@google.com', '서울시 용산구', 500000);
insert into User_info (user_id, username, name, password, created_at, update_at, email, address, spending_target) values (User_info_seq.NEXTVAL, 'je_ID' ,'박지은', '1234', sysdate, sysdate, 'je@google.com', '서울시 성동구', 500000);
insert into User_info (user_id, username, name, password, created_at, update_at, email, address, spending_target) values (User_info_seq.NEXTVAL, 'cr_ID' ,'김채림', '1234', sysdate, sysdate, 'cr@google.com', '경기도 광주시', 500000);
insert into User_info (user_id, username, name, password, created_at, update_at, email, address, spending_target) values (User_info_seq.NEXTVAL, 'hj_ID' ,'이혁주', '1234', sysdate, sysdate, 'hj@google.com', '경기도 동두천시', 500000);
insert into User_info (user_id, username, name, password, created_at, update_at, email, address, spending_target) values (User_info_seq.NEXTVAL, 'mk_ID' ,'허민경', '1234', sysdate, sysdate, 'mk@google.com', '서울시 강동구', 500000);
insert into User_info (user_id, username, name, password, created_at, update_at, email, address, spending_target) values (User_info_seq.NEXTVAL, 'hk_ID' ,'이현경', '1234', sysdate, sysdate, 'hk@google.com', '서울시 영등포구', 500000);


select * from User_info where user_id = 'jh_ID';
commit;

delete from User_info where user_id = 'jh_ID';
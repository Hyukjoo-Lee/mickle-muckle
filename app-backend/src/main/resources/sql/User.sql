create sequence user_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence user_seq
nocache;

select * from tbl_user;
drop table tbl_user;

insert into tbl_user values (user_seq.nextval, 'jh_ID' ,'김지훈', '1234', sysdate, sysdate, 'jh@google.com', '지후니뱃살', 500000);
insert into tbl_user values (user_seq.nextval, 'je_ID' ,'박지은', '1234', sysdate, sysdate, 'je@google.com', '지은누나', 500000);
insert into tbl_user values (user_seq.nextval, 'cr_ID' ,'김채림', '1234', sysdate, sysdate, 'cr@google.com', '채림누나', 500000);
insert into tbl_user values (user_seq.nextval, 'hj_ID' ,'이혁주', '1234', sysdate, sysdate, 'hj@google.com', '혁주형', 500000);
insert into tbl_user values (user_seq.nextval, 'mk_ID' ,'허민경', '1234', sysdate, sysdate, 'mk@google.com', '민경이', 500000);
insert into tbl_user values (user_seq.nextval, 'hk_ID' ,'이현경', '1234', sysdate, sysdate, 'hk@google.com', '현경이', 500000);


select * from tbl_user where id = 'jh_ID';
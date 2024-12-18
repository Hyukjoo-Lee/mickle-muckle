create sequence user_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence user_seq
nocache;

select * from user_info;

drop table user_info;

insert into user_info (user_num, id, name, email,  password,  address,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'cr_ID', '김채림', 'cr@google.com', '1234','집', 500000, sysdate, sysdate);

insert into user_info (user_num, id, name,  email, password,  address,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'hj_ID', '이혁주', 'hj@google.com', '1234','집', 500000, sysdate, sysdate);

insert into user_info (user_num, id, name,  email, password, address,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'mk_ID', '허민경', 'mk@google.com', '1234','집', 500000, sysdate, sysdate);

insert into user_info (user_num, id, name, email,  password, address,  spending_target, created_at, updated_at) 
values (user_seq.nextval, 'hk_ID', '이현경', 'hk@google.com','1234', '집', 500000, sysdate, sysdate);

commit;
select * from user_info where email = 'hk@google.com';

drop table user_info;

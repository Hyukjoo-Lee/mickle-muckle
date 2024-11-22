import CommonDialog from '../../common/CommonDialog';
export function CompleteChangePw() {
  return (
    <div style={{ position: 'relative' }}>
      <CommonDialog
        $visible={true}
        width="500px"
        height="200px"
        text2="취소"
        width1="100px"
        children="비밀번호가 변경되었습니다"
        $Contentwidth="450px"
        $Contentheight="90px"
        fontSize="20px"
      />
    </div>
  );
}
export default CompleteChangePw;
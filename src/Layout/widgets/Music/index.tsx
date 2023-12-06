import { useGetData } from '@/hooks';
import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
import './style.scss';

function Music() {
  useGetData('/current/query/music', {
    onSuccess: res => {
      const data = res.data.map(item => ({
        ...item,
        url: `${globalConfig.remoteStaticUrl}/music/${item.url}`,
      }));

      new APlayer({
        container: document.getElementById('aplayer'),
        audio: data,
        fixed: true,
        listFolded: true,
        autoplay: false,
        preload: 'auto',
        loop: 'all',
        order: 'random',
        theme: '#FADFA3',
        lrcType: 1,
      });
    },
  });

  return <div id='aplayer'></div>;
}

export default Music;

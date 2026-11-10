// Fluido SPH viscoelástico 3D (Clavet, Beaudoin & Poulin 2005), unidades: metros, tempo em passos.
function createFluid(o){
  const MAXP=o.max, h=o.h, h2=h*h, sp=o.spacing;
  const px=new Float32Array(MAXP),py=new Float32Array(MAXP),pz=new Float32Array(MAXP);
  const vx=new Float32Array(MAXP),vy=new Float32Array(MAXP),vz=new Float32Array(MAXP);
  const ox=new Float32Array(MAXP),oy=new Float32Array(MAXP),oz=new Float32Array(MAXP);
  const kind=new Uint8Array(MAXP),mat=new Uint8Array(MAXP),ground=new Uint8Array(MAXP),dead=new Uint8Array(MAXP);
  const [X0,Y0,Z0,X1,Y1,Z1]=o.bounds;
  const NX=Math.ceil((X1-X0)/h)+1,NY=Math.ceil((Y1-Y0)/h)+1,NZ=Math.ceil((Z1-Z0)/h)+1;
  const head=new Int32Array(NX*NY*NZ),next=new Int32Array(MAXP),pcell=new Int32Array(MAXP);
  const MAXN=56;const nb=new Int32Array(MAXP*MAXN),nd=new Float32Array(MAXP*MAXN),nc=new Uint8Array(MAXP);
  const dens=new Float32Array(MAXP),densN=new Float32Array(MAXP);
  const avx=new Float32Array(MAXP),avy=new Float32Array(MAXP),avz=new Float32Array(MAXP),awn=new Float32Array(MAXP);
  // densidade de repouso calculada numa malha ideal com o espaçamento desejado
  let REST=0;{const m=Math.ceil(h/sp)+1;for(let i=-m;i<=m;i++)for(let j=-m;j<=m;j++)for(let k=-m;k<=m;k++){if(!i&&!j&&!k)continue;const r=sp*Math.sqrt(i*i+j*j+k*k);if(r<h){const q=1-r/h;REST+=q*q;}}}
  const F={MAXP,h,REST,px,py,pz,vx,vy,vz,ox,oy,oz,kind,mat,ground,np:0,
    K:o.K,KN:o.KN,G:o.G,BETA:o.BETA,SIGMA:o.SIGMA||0,MAXV:o.maxV,
    used:new Int32Array(MAXP),nUsed:0,cap:MAXP};
  function cellOf(x,y,z){let cx=((x-X0)/h)|0,cy=((y-Y0)/h)|0,cz=((z-Z0)/h)|0;
    if(cx<0)cx=0;else if(cx>=NX)cx=NX-1;if(cy<0)cy=0;else if(cy>=NY)cy=NY-1;if(cz<0)cz=0;else if(cz>=NZ)cz=NZ-1;return (cz*NY+cy)*NX+cx;}
  let touched=new Int32Array(MAXP);let nt=0;
  function build(){const n=F.np;for(let k=0;k<nt;k++)head[touched[k]]=-1;nt=0;
    for(let i=0;i<n;i++){const c=cellOf(px[i],py[i],pz[i]);pcell[i]=c;if(head[c]===-1)touched[nt++]=c;next[i]=head[c];head[c]=i;}}
  head.fill(-1);
  function find(){const n=F.np;
    for(let i=0;i<n;i++){let cnt=0;const x=px[i],y=py[i],z=pz[i];const c=pcell[i];
      const cx=c%NX,cy=((c/NX)|0)%NY,cz=(c/(NX*NY))|0;const b=i*MAXN;
      for(let gz=cz-1;gz<=cz+1;gz++){if(gz<0||gz>=NZ)continue;for(let gy=cy-1;gy<=cy+1;gy++){if(gy<0||gy>=NY)continue;
        let base=(gz*NY+gy)*NX;for(let gx=cx-1;gx<=cx+1;gx++){if(gx<0||gx>=NX)continue;
          for(let j=head[base+gx];j!==-1;j=next[j]){if(j<=i)continue;const dx=px[j]-x,dy=py[j]-y,dz=pz[j]-z;const r2=dx*dx+dy*dy+dz*dz;
            if(r2<h2&&cnt<MAXN){nb[b+cnt]=j;nd[b+cnt]=Math.sqrt(r2);cnt++;}}}}}
      nc[i]=cnt;}}
  F.add=function(x,y,z,u,v,w,k,m){if(F.np>=F.cap)return -1;const i=F.np++;nc[i]=0;dead[i]=0;px[i]=ox[i]=x;py[i]=oy[i]=y;pz[i]=oz[i]=z;vx[i]=u;vy[i]=v;vz[i]=w;kind[i]=k||0;mat[i]=m||0;ground[i]=0;return i;};
  F.kill=function(i){if(dead[i])return false;dead[i]=1;F.nDead++;return true;};
  F.nDead=0;F.dead=dead;
  // compactação estável: mantém a ordem e remapeia as listas de vizinhos
  const remap=new Int32Array(MAXP);
  F.compact=function(){if(!F.nDead)return;const n=F.np;let j=0;
    for(let i=0;i<n;i++){if(dead[i]){remap[i]=-1;continue;}remap[i]=j;
      if(j!==i){px[j]=px[i];py[j]=py[i];pz[j]=pz[i];vx[j]=vx[i];vy[j]=vy[i];vz[j]=vz[i];ox[j]=ox[i];oy[j]=oy[i];oz[j]=oz[i];kind[j]=kind[i];mat[j]=mat[i];ground[j]=ground[i];}
      j++;}
    for(let i=0;i<n;i++){const ni=remap[i];if(ni<0)continue;const b=i*MAXN,c=nc[i],nb2=ni*MAXN;let k2=0;
      for(let k=0;k<c;k++){const t=remap[nb[b+k]];if(t>=0){nb[nb2+k2]=t;nd[nb2+k2]=nd[b+k];k2++;}}nc[ni]=k2;}
    for(let i=0;i<j;i++)dead[i]=0;
    F.np=j;F.nDead=0;if(F.listN>0)F.listN=j;};
  F.step=function(collide){
    const n=F.np,K=F.K,KN=F.KN,G=F.G,BETA=F.BETA,SIGMA=F.SIGMA;
    for(let i=0;i<n;i++)vy[i]-=kind[i]?G*2.2:G;
    // viscosidade + arrasto dos grãos (usa a lista de vizinhos do passo anterior, distâncias recalculadas)
    for(let i=0;i<n;i++){avx[i]=avy[i]=avz[i]=awn[i]=0;}
    if(F.listN>0){for(let i=0;i<n;i++){const b=i*MAXN,c=nc[i];for(let k=0;k<c;k++){const j=nb[b+k];
      let nx=px[j]-px[i],ny=py[j]-py[i],nz=pz[j]-pz[i];const r=Math.sqrt(nx*nx+ny*ny+nz*nz);if(r<1e-6||r>=h)continue;nx/=r;ny/=r;nz/=r;
      const u=(vx[i]-vx[j])*nx+(vy[i]-vy[j])*ny+(vz[i]-vz[j])*nz;
      if(u>0){const q=1-r/h;const I=q*(SIGMA*u+BETA*u*u)*.5;vx[i]-=I*nx;vy[i]-=I*ny;vz[i]-=I*nz;vx[j]+=I*nx;vy[j]+=I*ny;vz[j]+=I*nz;}
      if(kind[i]&&!kind[j]){avx[i]+=vx[j];avy[i]+=vy[j];avz[i]+=vz[j];awn[i]++;}
      if(kind[j]&&!kind[i]){avx[j]+=vx[i];avy[j]+=vy[i];avz[j]+=vz[i];awn[j]++;}}}}
    for(let i=0;i<n;i++){if(kind[i]){if(awn[i]>=2){const d=.12,w=1/awn[i];vx[i]+=(avx[i]*w-vx[i])*d;vz[i]+=(avz[i]*w-vz[i])*d;vy[i]+=(avy[i]*w-vy[i])*d*.4;}
      else if(ground[i]){vx[i]*=.6;vz[i]*=.6;}}}
    for(let i=0;i<n;i++){ox[i]=px[i];oy[i]=py[i];oz[i]=pz[i];px[i]+=vx[i];py[i]+=vy[i];pz[i]+=vz[i];}
    build();find();F.listN=n;
    // relaxação de dupla densidade
    for(let i=0;i<n;i++){dens[i]=0;densN[i]=0;}
    for(let i=0;i<n;i++){const b=i*MAXN,c=nc[i];for(let k=0;k<c;k++){const j=nb[b+k];const q=1-nd[b+k]/h;const q2=q*q,q3=q2*q;dens[i]+=q2;densN[i]+=q3;dens[j]+=q2;densN[j]+=q3;}}
    for(let i=0;i<n;i++){let P=K*(dens[i]-REST);if(P<0)P*=.6;const PN=KN*densN[i];const b=i*MAXN,c=nc[i];let dx=0,dy=0,dz=0;
      for(let k=0;k<c;k++){const j=nb[b+k];const ex=px[j]-px[i]-dx,ey=py[j]-py[i]-dy,ez=pz[j]-pz[i]-dz;const r=Math.sqrt(ex*ex+ey*ey+ez*ez);if(r<1e-5||r>=h)continue;const q=1-r/h;
        let Pj=K*(dens[j]-REST);if(Pj<0)Pj*=.6;let D=((P+Pj)*.5*q+(PN+KN*densN[j])*.5*q*q)*.5;if(D>h*.3)D=h*.3;D/=r;
        const ux=ex*D,uy=ey*D,uz=ez*D;
        px[j]+=ux;py[j]+=uy;pz[j]+=uz;dx-=ux;dy-=uy;dz-=uz;}
      px[i]+=dx;py[i]+=dy;pz[i]+=dz;}
    collide();
    const MV=F.MAXV,MV2=MV*MV;
    for(let i=0;i<n;i++){let u=px[i]-ox[i],v=py[i]-oy[i],w=pz[i]-oz[i];const s=u*u+v*v+w*w;if(s>MV2){const k=MV/Math.sqrt(s);u*=k;v*=k;w*=k;}vx[i]=u;vy[i]=v;vz[i]=w;}
  };
  F.neighborCount=i=>nc[i];
  F.density=dens;
  return F;
}
if(typeof module!=='undefined')module.exports={createFluid};

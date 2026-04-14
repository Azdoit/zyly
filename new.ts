import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ClipboardList,
  HeartPulse,
  Building2,
  FileText,
  User,
  Bell,
  Search,
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  ShieldCheck,
  MapPin,
  ShoppingBag,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';

const phoneFrame =
  'mx-auto w-full max-w-[390px] h-[min(844px,calc(100vh-220px))] min-h-[720px] rounded-[36px] border border-slate-200 bg-white shadow-2xl overflow-hidden';
const sectionCard = 'rounded-[24px] border border-slate-200 shadow-sm bg-white';
const iconChip = 'rounded-2xl bg-slate-100 border border-slate-200 p-2.5';
const infoBadgeClass =
  'rounded-full whitespace-nowrap px-3 py-1 shrink-0 bg-slate-100 text-slate-700 border border-slate-200';
const statusBadgeClass =
  'rounded-full whitespace-nowrap px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200';
const fieldBadgeClass =
  'rounded-full whitespace-nowrap px-3 py-1 bg-white text-slate-600 border border-slate-200';

const appTabs = [
  { key: 'consult', label: '问诊', icon: ClipboardList },
  { key: 'plan', label: '方案', icon: HeartPulse },
  { key: 'therapy', label: '理疗', icon: Building2 },
  { key: 'record', label: '档案', icon: FileText },
  { key: 'me', label: '我的', icon: User },
];

const adminMenus = [
  { key: 'dashboard', label: '数据总览', icon: LayoutDashboard },
  { key: 'users', label: '用户中心', icon: Users },
  { key: 'consult', label: '问诊中心', icon: Stethoscope },
  { key: 'plan', label: '方案中心', icon: HeartPulse },
  { key: 'therapy', label: '场景承接', icon: CalendarDays },
  { key: 'record', label: '健康档案', icon: FileText },
  { key: 'commerce', label: '会员商品', icon: ShoppingBag },
  { key: 'system', label: '平台配置', icon: Settings },
];

function Stat({ label, value, sub }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="mt-2 text-2xl font-semibold">{value}</div>
        <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      </CardContent>
    </Card>
  );
}

function MiniTopBar({ title, subtitle }) {
  return (
    <div className="px-5 pt-5 pb-3 border-b bg-white">
      <div className="flex items-start justify-between gap-3 flex-nowrap">
        <div>
          <div className="text-lg font-semibold tracking-tight">{title}</div>
          {subtitle ? <div className="text-[11px] text-muted-foreground mt-1">{subtitle}</div> : null}
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

function IntroCard({ title, desc, badge }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-3xl border-0 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xl font-semibold">{title}</div>
              {desc ? <div className="mt-2 text-xs text-muted-foreground">{desc}</div> : null}
            </div>
            {badge ? (
              <Badge variant="secondary" className={infoBadgeClass}>
                {badge}
              </Badge>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ConsultScreen() {
  const [consultTab, setConsultTab] = useState('overview');
  const [prediagnosisComplete, setPrediagnosisComplete] = useState(false);
  const [tongueCaptureComplete, setTongueCaptureComplete] = useState(false);
  const [fingerDoctorDataReady] = useState(true);
  const [showSyndromeResult, setShowSyndromeResult] = useState(false);

  const sectionStats = [
    ['寒热', '8题'],
    ['汗出', '6题'],
    ['头身', '7题'],
    ['胸腹', '8题'],
    ['饮食', '8题'],
    ['二便', '7题'],
    ['睡眠', '4题'],
    ['精神', '5题'],
  ];

  const optionChip = 'rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-600';
  const canRunSyndromeAnalysis =
    prediagnosisComplete && tongueCaptureComplete && fingerDoctorDataReady;

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="问诊" subtitle="采集与辩证" />
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            onClick={() => setConsultTab('overview')}
            className={`rounded-2xl px-3 py-2 text-sm font-medium ${
              consultTab === 'overview' ? 'bg-white shadow-sm' : 'text-slate-500'
            }`}
          >
            问诊首页
          </button>
          <button
            onClick={() => setConsultTab('form')}
            className={`rounded-2xl px-3 py-2 text-sm font-medium ${
              consultTab === 'form' ? 'bg-white shadow-sm' : 'text-slate-500'
            }`}
          >
            问诊单填写
          </button>
        </div>

        {consultTab === 'overview' && (
          <>
            <IntroCard title="填写问卷、上传舌象" desc="完成后生成辨证结果" badge="核心" />

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">预诊问卷</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">当前进度</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {prediagnosisComplete ? '4 步内容已完成，可进入 AI 综合辩证' : '共 4 步，已完成 3 步'}
                    </div>
                  </div>
                  <Badge variant="secondary" className={statusBadgeClass}>
                    {prediagnosisComplete ? '已完成' : '进行中'}
                  </Badge>
                </div>
                <Progress value={prediagnosisComplete ? 100 : 75} />
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border p-4">
                    <div className="font-medium">主诉症状</div>
                    <div className="text-xs text-muted-foreground mt-2">胃胀、睡眠浅、易疲劳</div>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="font-medium">生活习惯</div>
                    <div className="text-xs text-muted-foreground mt-2">晚睡、久坐、饮食不规律</div>
                  </div>
                </div>
                <Button
                  className="w-full rounded-2xl"
                  onClick={() => {
                    setPrediagnosisComplete(true);
                    setShowSyndromeResult(false);
                  }}
                >
                  继续填写预诊
                </Button>
              </CardContent>
            </Card>

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">舌象采集</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">采集状态</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {tongueCaptureComplete ? '舌象已上传，可用于综合辩证' : '请在自然光下拍照或上传清晰舌象'}
                    </div>
                  </div>
                  <Badge variant="secondary" className={statusBadgeClass}>
                    {tongueCaptureComplete ? '已完成' : '待采集'}
                  </Badge>
                </div>

                <div className="rounded-2xl border-2 border-dashed p-6 text-center bg-slate-50">
                  <div className="text-sm font-medium">拍照 / 上传舌象</div>
                  <div className="text-xs text-muted-foreground mt-2">自然光下拍摄</div>
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-2xl"
                  onClick={() => {
                    setTongueCaptureComplete(true);
                    setShowSyndromeResult(false);
                  }}
                >
                  完成舌象采集
                </Button>
              </CardContent>
            </Card>

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">手指医生数据</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground mt-1">
                      由设备检测结果自动同步，无需手动填写
                    </div>
                  </div>
                  <Badge variant="secondary" className={statusBadgeClass}>
                    {fingerDoctorDataReady ? '已同步' : '待同步'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl border p-3 bg-white">
                    <div className="text-slate-500">最近同步时间</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">2026/04/14 10:32</div>
                  </div>
                  <div className="rounded-2xl border p-3 bg-white">
                    <div className="text-slate-500">数据来源</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">手指医生设备</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-2xl border p-3 text-center">睡眠相关 12 项</div>
                  <div className="rounded-2xl border p-3 text-center">体质相关 18 项</div>
                  <div className="rounded-2xl border p-3 text-center">脏腑相关 9 项</div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full rounded-2xl"
              disabled={!canRunSyndromeAnalysis}
              onClick={() => {
                setConsultTab('overview');
                setShowSyndromeResult(true);
              }}
            >
              AI综合辩证
            </Button>

            {showSyndromeResult && (
              <Card className={sectionCard}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">本次辨证结果</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-2xl bg-amber-50 border p-4 text-sm leading-6">
                    <div className="font-semibold">肝郁脾虚、湿困中焦</div>
                    <div className="text-xs text-muted-foreground mt-2">睡眠浅、胃胀、疲劳感重</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="rounded-2xl border p-3 text-center">睡眠 2/5</div>
                    <div className="rounded-2xl border p-3 text-center">脾胃 3/5</div>
                    <div className="rounded-2xl border p-3 text-center">情绪 2/5</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {consultTab === 'form' && (
          <>
            <IntroCard
              title="八大维度问诊单"
              desc="寒热、汗出、头身、胸腹、饮食、二便、睡眠、精神"
              badge="填写"
            />

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">问诊进度</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">当前进度</div>
                    <div className="text-xs text-muted-foreground mt-1">共 8 个维度，已完成 2 个</div>
                  </div>
                  <Badge variant="secondary" className={statusBadgeClass}>
                    进行中
                  </Badge>
                </div>
                <Progress value={25} />
                <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                  {sectionStats.map(([name, count], idx) => (
                    <div
                      key={name}
                      className={`rounded-2xl border p-3 ${idx < 2 ? 'bg-slate-100' : 'bg-white'}`}
                    >
                      <div className="font-medium">{name}</div>
                      <div className="text-muted-foreground mt-1">{count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">当前章节：寒热问诊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">H_001 恶寒情况</div>
                      <div className="text-xs text-muted-foreground mt-1">请选择最符合当前状态的一项</div>
                    </div>
                    <Badge variant="secondary" className={fieldBadgeClass}>
                      单选
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className={optionChip}>无恶寒</div>
                    <div className={`${optionChip} border-slate-900 bg-slate-900 text-white`}>恶寒轻微</div>
                    <div className={optionChip}>恶寒明显</div>
                    <div className={optionChip}>恶寒重剧</div>
                  </div>
                </div>

                <div className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">H_003 发热情况</div>
                      <div className="text-xs text-muted-foreground mt-1">可用于判断寒热偏性与热势强弱</div>
                    </div>
                    <Badge variant="secondary" className={fieldBadgeClass}>
                      单选
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className={optionChip}>无发热</div>
                    <div className={optionChip}>发热轻微</div>
                    <div className={optionChip}>中等发热</div>
                    <div className={optionChip}>高热</div>
                    <div className={optionChip}>潮热</div>
                  </div>
                </div>

                <div className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">H_005 恶寒与发热关系</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        用于辨别表里、寒热并见等情况
                      </div>
                    </div>
                    <Badge variant="secondary" className={fieldBadgeClass}>
                      单选
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className={optionChip}>恶寒发热并见</div>
                    <div className={optionChip}>但恶寒不发热</div>
                    <div className={optionChip}>但发热不恶寒</div>
                    <div className={optionChip}>不恶寒反恶热</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full rounded-2xl"
              onClick={() => {
                setPrediagnosisComplete(true);
                setConsultTab('overview');
                setShowSyndromeResult(false);
              }}
            >
              保存并继续下一章节
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function PlanScreen({ goToTherapyWithProject }) {
  const todayPlan = [
    ['饮食调理', '早餐温热清淡，减少生冷；晚餐建议提前并控制油腻摄入'],
    ['作息建议', '建议 23:00 前入睡，晚间减少高强度用脑与情绪刺激'],
    ['理疗方向', '优先考虑助眠舒缓与健脾和中方向，不直接在本页做机构选择'],
  ];

  const historyPlans = [
    ['2026/04/08', '初始辨证方案', '以疏肝理气、改善睡眠为主'],
    ['2026/04/06', '历史调理记录', '以缓解疲劳、调节脾胃为主'],
    ['2026/03/28', '上次问诊方案', '以情绪舒缓与作息修复为主'],
  ];

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="方案" subtitle="今日方案与历史记录" />
      <div className="p-4 space-y-4">
        <IntroCard title="查看今日方案" desc="支持回看历史" badge="方案" />

        <Card className="rounded-3xl border-0 bg-gradient-to-br from-emerald-50 to-cyan-50 shadow-sm">
          <CardContent className="p-5">
            <div className="text-base font-semibold">今日方案摘要</div>
            <div className="mt-2 text-sm text-muted-foreground">疏肝理气 · 健脾和中 · 睡眠修复</div>
            <Button
              className="w-full rounded-2xl mt-4"
              onClick={() => goToTherapyWithProject('sleep')}
            >
              去承接理疗
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="today" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl">
            <TabsTrigger value="today" className="rounded-2xl">
              今日方案
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-2xl">
              历史方案
            </TabsTrigger>
            <TabsTrigger value="logic" className="rounded-2xl">
              调整依据
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4 mt-0">
            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">今日个性化方案</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayPlan.map(([name, desc]) => (
                  <div key={name} className="rounded-2xl border p-4">
                    <div className="text-sm font-medium">{name}</div>
                    <div className="text-xs text-muted-foreground mt-2 leading-5">{desc}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">今日反馈样例</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl border p-3 text-center">睡眠 3/5</div>
                <div className="rounded-2xl border p-3 text-center">体感 4/5</div>
                <div className="rounded-2xl border p-3 text-center">胃胀 ↓</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-0">
            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">历史方案记录</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {historyPlans.map(([date, title, desc]) => (
                  <div key={date + title} className="rounded-2xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium">{title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{date}</div>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        查看当日详情
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-3 leading-5">{desc}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logic" className="space-y-4 mt-0">
            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">方案调整依据</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  '根据每日反馈，对睡眠、情绪、脾胃状态进行动态调整',
                  '不同日期的方案会保留，方便查看变化轨迹与调理过程',
                  '后续可与历史问诊、历史舌象、历史理疗记录联动查看',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border p-3 bg-slate-50">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TherapyScreen({ prefill, clearPrefill }) {
  const therapyProjects = [
    {
      id: 'sleep',
      name: '助眠舒缓项目',
      desc: '适合睡眠浅、夜醒频繁、压力偏大时选择',
    },
    {
      id: 'spleen',
      name: '健脾和中理疗',
      desc: '适合胃胀、疲劳感重、饮食不规律时选择',
    },
    {
      id: 'mood',
      name: '情绪舒缓调理',
      desc: '适合情绪紧张、胸闷不舒时选择',
    },
  ];

  const therapyInstitutions = [
    {
      id: 'hotel',
      name: 'XX康养酒店理疗中心',
      desc: '距离 280m · 可承接助眠舒缓 / 经络理疗',
      tags: ['助眠舒缓', '经络理疗'],
    },
    {
      id: 'herb',
      name: '本草养生馆',
      desc: '距离 1.2km · 可承接脾胃调理 / 情绪舒缓',
      tags: ['健脾和中', '情绪舒缓'],
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [authorizedInstitution, setAuthorizedInstitution] = useState(null);
  const [appointmentCreated, setAppointmentCreated] = useState(false);

  useEffect(() => {
    if (prefill?.projectId) {
      setSelectedProject(prefill.projectId);
      setSelectedInstitution(null);
      setAuthorizedInstitution(null);
      setAppointmentCreated(false);
      if (clearPrefill) clearPrefill();
    }
  }, [prefill, clearPrefill]);

  const selectedProjectInfo = therapyProjects.find((item) => item.id === selectedProject);
  const selectedInstitutionInfo = therapyInstitutions.find((item) => item.id === selectedInstitution);
  const authorizedInstitutionInfo = therapyInstitutions.find((item) => item.id === authorizedInstitution);

  const canAuthorize = !!selectedInstitution;
  const canReserve = !!selectedProject && !!authorizedInstitution;

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="理疗" subtitle="项目、机构、授权与预约" />
      <div className="p-4 space-y-4">
        <IntroCard title="项目 ➡️ 机构 ➡️ 授权" desc="授权后即可预约线下养生服务" badge="理疗" />

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">当前承接进度</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              {[
                ['选择项目', selectedProject ? '已完成' : '待完成'],
                ['选择机构', selectedInstitution ? '已完成' : '待完成'],
                ['完成授权', authorizedInstitution ? '已完成' : '待完成'],
                ['提交预约', appointmentCreated ? '已完成' : '待完成'],
              ].map(([name, status]) => (
                <div
                  key={name}
                  className={`rounded-2xl border p-3 ${
                    status === '已完成' ? 'bg-slate-100' : 'bg-white'
                  }`}
                >
                  <div className="font-medium">{name}</div>
                  <div className="text-muted-foreground mt-1">{status}</div>
                </div>
              ))}
            </div>

            <Progress
              value={
                appointmentCreated
                  ? 100
                  : authorizedInstitution
                    ? 75
                    : selectedInstitution
                      ? 50
                      : selectedProject
                        ? 25
                        : 0
              }
            />
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">推荐理疗项目</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {therapyProjects.map((item) => {
              const active = selectedProject === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedProject(item.id);
                    setAppointmentCreated(false);
                  }}
                  className={`w-full text-left flex items-start gap-3 rounded-2xl border p-4 transition ${
                    active ? 'border-slate-900 bg-slate-50' : 'bg-white'
                  }`}
                >
                  <div className={iconChip}>
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium">{item.name}</div>
                      <Badge variant="secondary" className={active ? fieldBadgeClass : infoBadgeClass}>
                        {active ? '已选中' : '可选择'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 leading-5">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">附近理疗机构</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!selectedProject && (
              <div className="rounded-2xl border p-4 bg-slate-50 text-sm text-slate-600">
                请先选择理疗项目，查看适合的承接机构。
              </div>
            )}

            {therapyInstitutions.map((item) => {
              const active = selectedInstitution === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedInstitution(item.id);
                    setAppointmentCreated(false);
                    if (authorizedInstitution && authorizedInstitution !== item.id) {
                      setAuthorizedInstitution(null);
                    }
                  }}
                  className={`w-full text-left rounded-2xl border p-4 transition ${
                    active ? 'border-slate-900 bg-slate-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className={iconChip}>
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.desc}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Badge variant="secondary" className={active ? fieldBadgeClass : infoBadgeClass}>
                      {active ? '已选中' : '选择机构'}
                    </Badge>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">数据授权</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!selectedInstitution && (
              <div className="rounded-2xl border p-4 bg-slate-50">
                <div className="text-sm font-medium">当前未选择承接机构</div>
                <div className="text-xs text-muted-foreground mt-2">
                  请选择机构后，再授权对方查看你的问诊摘要与方案方向。
                </div>
              </div>
            )}

            {selectedInstitutionInfo && (
              <>
                <div className="flex items-start gap-3 rounded-2xl border p-4 bg-slate-50">
                  <div className={iconChip}>
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {authorizedInstitution === selectedInstitution
                        ? `已授权给 ${selectedInstitutionInfo.name}`
                        : `待授权给 ${selectedInstitutionInfo.name}`}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      授权后，机构可查看你的问诊摘要、方案方向，用于到店承接理疗服务。
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {authorizedInstitution === selectedInstitution ? '已授权' : '未授权'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* <div className="rounded-2xl border p-3">授权对象：{selectedInstitutionInfo.name}</div> */}
                  <div className="rounded-2xl border p-3">授权内容：问诊摘要 / 方案方向</div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 rounded-2xl"
                    disabled={!canAuthorize}
                    onClick={() => {
                      setAuthorizedInstitution(selectedInstitution);
                      setAppointmentCreated(false);
                    }}
                  >
                    {authorizedInstitution === selectedInstitution ? '更新授权' : '确认授权'}
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 rounded-2xl"
                    onClick={() => {
                      setAuthorizedInstitution(null);
                      setAppointmentCreated(false);
                    }}
                  >
                    撤回授权
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">预约确认</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border p-4 bg-slate-50">
              <div className="text-sm font-medium">预约摘要</div>
              <div className="grid grid-cols-1 gap-2 mt-3 text-xs text-muted-foreground">
                <div>理疗项目：{selectedProjectInfo ? selectedProjectInfo.name : '暂未选择'}</div>
                <div>承接机构：{selectedInstitutionInfo ? selectedInstitutionInfo.name : '暂未选择'}</div>
                <div>
                  授权状态：
                  {authorizedInstitution && selectedInstitutionInfo && authorizedInstitution === selectedInstitution
                    ? ' 已授权'
                    : ' 未授权'}
                </div>
                <div>预约时间：到店后确认 / 后续可扩展时间选择</div>
              </div>
            </div>

            <Button
              className="w-full rounded-2xl"
              disabled={!canReserve}
              onClick={() => setAppointmentCreated(true)}
            >
              提交预约
            </Button>

            {appointmentCreated && (
              <div className="rounded-2xl border p-4 bg-white">
                <div className="text-sm font-medium">预约已提交</div>
                <div className="text-xs text-muted-foreground mt-2 leading-5">
                  已向 {authorizedInstitutionInfo?.name} 提交承接预约，后续可在此查看预约详情、到店状态与服务记录。
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RecordScreen() {
  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="档案" subtitle="历史记录与报告" />
      <div className="p-4 space-y-4">
        <IntroCard title="回看记录与报告" desc="长期沉淀" badge="档案" />

        <Card className={sectionCard}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>李</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">李女士</div>
                <div className="text-xs text-muted-foreground mt-1">
                  累计问诊 3 次 · 累计方案 5 天 · 离店报告 1 份
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">档案目录</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['问诊记录', '3 次'],
              ['舌象记录', '2 次'],
              ['手指医生记录', '2 次'],
              ['历史方案', '5 天'],
              ['理疗记录', '2 次'],
              ['阶段报告', '1 份'],
              ['会员标签', '睡眠调理'],
            ].map(([name, value]) => (
              <div key={name} className="rounded-2xl border p-4 bg-white">
                <div className="font-medium">{name}</div>
                <div className="text-xs text-muted-foreground mt-2">{value}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">时间轴</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ['2026/04/09', '生成本次辨证结果与当日方案'],
              ['2026/04/08', '完成舌象采集与手指医生数据同步'],
              ['2026/03/28', '完成上次调理并生成评估报告'],
            ].map(([date, title]) => (
              <div key={date + title} className="rounded-2xl border p-4">
                <div className="text-sm font-medium">{title}</div>
                <div className="text-xs text-muted-foreground mt-1">{date}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MeScreen() {
  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="我的" subtitle="账户与权限" />
      <div className="p-4 space-y-4">
        <IntroCard title="授权、会员、订单" desc="账户中心" badge="我的" />

        <Card className="rounded-3xl border-0 shadow-sm bg-gradient-to-br from-violet-50 to-fuchsia-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-semibold">银卡会员</div>
                <div className="text-xs text-muted-foreground mt-1">积分 1,280</div>
              </div>
              <Badge variant="secondary" className={infoBadgeClass}>
                会员中心
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">授权管理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border p-4 bg-slate-50">
              <div className="text-sm font-medium">当前未授权</div>
              <div className="text-xs text-muted-foreground mt-2">支持按次授权与撤回</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border p-3">最近授权：0 次</div>
              <div className="rounded-2xl border p-3">撤回记录：1 次</div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 rounded-2xl">去授权</Button>
              <Button variant="outline" className="flex-1 rounded-2xl">
                授权记录
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {['我的订单', '商城入口', '消息通知', '联系客服', '地址管理', '账户设置'].map((x) => (
            <Card key={x} className={sectionCard}>
              <CardContent className="p-4 text-sm font-medium">{x}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniProgramPrototype() {
  const [tab, setTab] = useState('consult');
  const [therapyPrefill, setTherapyPrefill] = useState(null);

  const goToTherapyWithProject = (projectId) => {
    setTherapyPrefill({ projectId });
    setTab('therapy');
  };

  const clearTherapyPrefill = () => {
    setTherapyPrefill(null);
  };

  const screen = useMemo(() => {
    switch (tab) {
      case 'plan':
        return <PlanScreen goToTherapyWithProject={goToTherapyWithProject} />;
      case 'therapy':
        return <TherapyScreen prefill={therapyPrefill} clearPrefill={clearTherapyPrefill} />;
      case 'record':
        return <RecordScreen />;
      case 'me':
        return <MeScreen />;
      default:
        return <ConsultScreen />;
    }
  }, [tab, therapyPrefill]);

  return (
    <div className={phoneFrame}>
      <div className="flex h-full min-h-0 flex-col bg-white">
        <ScrollArea className="min-h-0 flex-1">{screen}</ScrollArea>
        <div className="shrink-0 border-t bg-white px-2 py-2">
          <div className="grid grid-cols-5 gap-1">
            {appTabs.map((item) => {
              const Icon = item.icon;
              const active = tab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`rounded-2xl px-2 py-2 text-center transition ${active ? 'bg-slate-100' : ''}`}
                >
                  <Icon className={`mx-auto h-5 w-5 ${active ? 'opacity-100' : 'opacity-50'}`} />
                  <div className={`mt-1 text-[11px] ${active ? 'font-medium' : 'text-muted-foreground'}`}>
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <Stat label="本周活跃用户" value="1,286" sub="核心看用户规模" />
        <Stat label="问诊完成率" value="82%" sub="核心看采集完成情况" />
        <Stat label="方案生成率" value="74%" sub="核心看核心引擎产出" />
        <Stat label="理疗承接率" value="41%" sub="核心看场景转化" />
      </div>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>平台主链路</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3 text-center text-sm">
            {['用户进入', '完成问诊', '生成方案', '场景承接', '沉淀档案'].map((x) => (
              <div key={x} className="rounded-2xl border p-4 bg-slate-50">
                {x}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UsersPage() {
  return (
    <div className="space-y-5">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索用户姓名 / 手机号 / 用户ID" className="border-0 shadow-none px-0" />
          </div>
          <Button className="rounded-xl">新增用户</Button>
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>用户列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="p-3">用户</th>
                  <th className="p-3">最近问诊</th>
                  <th className="p-3">当前阶段</th>
                  <th className="p-3">会员状态</th>
                  <th className="p-3">场景授权</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['李女士', '2026/04/09', '方案中', '银卡会员', '未授权'],
                  ['王先生', '2026/04/08', '问诊中', '普通用户', '未授权'],
                  ['赵女士', '2026/03/28', '已归档', '金卡会员', '已授权 1 家机构'],
                ].map((row) => (
                  <tr key={row[0]} className="border-t">
                    {row.map((cell) => (
                      <td key={cell} className="p-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ConsultCenterPage() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>问卷模板</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['基础问诊单', '女性专项问卷', '睡眠专项问卷'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>舌象审核</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['今日上传 58 张', '异常图片 6 张', '待复核 12 条'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>辨证结果分布</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['肝郁脾虚 31%', '脾胃湿困 24%', '气血不足 19%'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PlanCenterPage() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>方案模板</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['舒肝解郁方案', '健脾安神方案', '睡眠修复方案'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>动态调整规则</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['睡眠差 → 助眠优先', '胃胀重 → 健脾优先', '情绪波动大 → 舒肝优先'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function TherapyCenterPage() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>合作机构</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['康养酒店 6 家', '养生馆 12 家', '待审核机构 3 家'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>服务项目</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['助眠舒缓', '健脾和中', '情绪舒缓'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>授权与预约</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['今日授权 39 次', '预约转化 21 单', '撤回授权 4 次'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function RecordCenterPage() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>档案资产</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['问诊记录 12,486 条', '舌象记录 6,203 条', '历史方案 28,730 份', '评估报告 3,120 份'].map(
            (x) => (
              <div key={x} className="rounded-2xl border p-3">
                {x}
              </div>
            ),
          )}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>数据质量</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['完整度 96%', '可追溯率 99%', '重复用户识别 98%'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function CommercePage() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>会员运营</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['银卡会员 820 人', '金卡会员 216 人', '复购意向 129 人'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>商品与服务包</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {['草本安睡茶', '脾胃调养足浴包', '睡眠改善服务包'].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function SystemPage() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {['角色权限', '接口配置', '字典配置', '消息模板', '问卷题库', '授权规则'].map((x) => (
        <Card key={x} className="rounded-2xl shadow-sm">
          <CardContent className="p-5">
            <div className="text-sm font-medium">{x}</div>
            <div className="text-xs text-muted-foreground mt-2">预留配置页原型入口</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AdminPrototype() {
  const [menu, setMenu] = useState('dashboard');

  const content = useMemo(() => {
    switch (menu) {
      case 'users':
        return <UsersPage />;
      case 'consult':
        return <ConsultCenterPage />;
      case 'plan':
        return <PlanCenterPage />;
      case 'therapy':
        return <TherapyCenterPage />;
      case 'record':
        return <RecordCenterPage />;
      case 'commerce':
        return <CommercePage />;
      case 'system':
        return <SystemPage />;
      default:
        return <DashboardPage />;
    }
  }, [menu]);

  return (
    <div className="rounded-[28px] border bg-white shadow-2xl overflow-hidden min-h-[844px]">
      <div className="grid grid-cols-[240px_1fr] min-h-[844px]">
        <div className="border-r bg-slate-50 p-4">
          <div className="px-3 py-4">
            <div className="text-lg font-semibold tracking-tight">平台运营后台</div>
          </div>
          <div className="space-y-1 mt-2">
            {adminMenus.map((item) => {
              const Icon = item.icon;
              const active = menu === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setMenu(item.key)}
                  className={`w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${
                    active ? 'bg-white shadow-sm border' : 'hover:bg-white/70'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="bg-white">
          <div className="border-b px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">{adminMenus.find((x) => x.key === menu)?.label}</div>
            </div>
            <div className="flex items-center gap-3">
              <Input placeholder="搜索功能或用户" className="w-64 rounded-2xl" />
              <Avatar>
                <AvatarFallback>管</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <ScrollArea className="h-[780px]">
            <div className="p-6">{content}</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export function TCMPrototypePage({ defaultView = 'mini' }) {
  const [view, setView] = useState(defaultView);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-3xl font-semibold tracking-tight">中医健康服务平台 · 产品原型</div>
            <div className="text-sm text-muted-foreground mt-2">按主路径重排，保留必要样例数据</div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={view === 'mini' ? 'default' : 'outline'}
              className="rounded-2xl"
              onClick={() => setView('mini')}
            >
              用户小程序
            </Button>
            <Button
              variant={view === 'admin' ? 'default' : 'outline'}
              className="rounded-2xl"
              onClick={() => setView('admin')}
            >
              平台后台
            </Button>
            <Button
              variant={view === 'both' ? 'default' : 'outline'}
              className="rounded-2xl"
              onClick={() => setView('both')}
            >
              双端同看
            </Button>
          </div>
        </div>

        {view === 'mini' && (
          <div className="flex justify-center">
            <MiniProgramPrototype />
          </div>
        )}

        {view === 'admin' && <AdminPrototype />}

        {view === 'both' && (
          <div className="grid xl:grid-cols-[420px_1fr] gap-8 items-start">
            <MiniProgramPrototype />
            <AdminPrototype />
          </div>
        )}
      </div>
    </div>
  );
}

export default TCMPrototypePage;
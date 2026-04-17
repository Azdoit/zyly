import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
} from "lucide-react";
import { motion } from "framer-motion";

const phoneFrame =
  "mx-auto w-full max-w-[390px] h-[min(844px,calc(100vh-220px))] min-h-[720px] rounded-[36px] border border-slate-200 bg-white shadow-2xl overflow-hidden";
const sectionCard = "rounded-[24px] border border-slate-200 shadow-sm bg-white";
const iconChip = "rounded-2xl bg-slate-100 border border-slate-200 p-2.5";
const infoBadgeClass =
  "rounded-full whitespace-nowrap px-3 py-1 shrink-0 bg-slate-100 text-slate-700 border border-slate-200";
const statusBadgeClass =
  "rounded-full whitespace-nowrap px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200";
const fieldBadgeClass =
  "rounded-full whitespace-nowrap px-3 py-1 bg-white text-slate-600 border border-slate-200";
const badgeDoneClass =
  "rounded-full whitespace-nowrap px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200";
const badgePendingClass =
  "rounded-full whitespace-nowrap px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200";
const badgeSelectedClass =
  "rounded-full whitespace-nowrap px-3 py-1 bg-slate-900 text-white border border-slate-900";
const badgeIdleClass =
  "rounded-full whitespace-nowrap px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200";

const appTabs = [
  { key: "consult", label: "健康问卷", icon: ClipboardList },
  { key: "plan", label: "方案", icon: HeartPulse },
  { key: "therapy", label: "调理", icon: Building2 },
  { key: "record", label: "档案", icon: FileText },
  { key: "me", label: "我的", icon: User },
];

const adminMenus = [
  { key: "dashboard", label: "数据总览", icon: LayoutDashboard },
  { key: "users", label: "用户中心", icon: Users },
  { key: "consult", label: "健康问卷中心", icon: Stethoscope },
  { key: "plan", label: "方案中心", icon: HeartPulse },
  { key: "therapy", label: "场景承接", icon: CalendarDays },
  { key: "record", label: "健康档案", icon: FileText },
  { key: "commerce", label: "会员商品", icon: ShoppingBag },
  { key: "system", label: "平台配置", icon: Settings },
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
          {subtitle ? (
            <div className="text-[11px] text-muted-foreground mt-1">
              {subtitle}
            </div>
          ) : null}
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
              {desc ? (
                <div className="mt-2 text-xs text-muted-foreground">{desc}</div>
              ) : null}
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
  const [consultTab, setConsultTab] = useState("overview");
  const [profileComplete, setProfileComplete] = useState(true);
  const [profileData] = useState({
    gender: "女",
    age: "32",
    bmi: "20.9",
    history: "无重大既往病史",
    allergy: "无",
  });

  const [visitData, setVisitData] = useState({
    chiefComplaint: "胃胀、睡眠浅、易疲劳",
    presentIllness: "近两周工作压力增大后加重，伴随入睡困难与白天乏力",
  });
  const visitComplete = Boolean(
    visitData.chiefComplaint.trim() && visitData.presentIllness.trim()
  );

  const [bagangComplete, setBagangComplete] = useState(false);
  const [tongueCaptureComplete, setTongueCaptureComplete] = useState(false);
  const [fingerDoctorDataReady] = useState(true);
  const [showSyndromeResult, setShowSyndromeResult] = useState(false);

  const sectionStats = [
    ["寒热", "8题"],
    ["汗出", "6题"],
    ["头身", "7题"],
    ["胸腹", "8题"],
    ["饮食", "8题"],
    ["二便", "7题"],
    ["睡眠", "4题"],
    ["精神", "5题"],
  ];

  const optionChip =
    "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-600";
  const canRunSyndromeAnalysis =
    profileComplete &&
    visitComplete &&
    bagangComplete &&
    tongueCaptureComplete &&
    fingerDoctorDataReady;

  const getPrimaryAction = () => {
    if (!profileComplete)
      return {
        label: "先完善个人档案",
        action: () => setConsultTab("profile"),
      };
    if (!visitComplete)
      return {
        label: "继续本次健康问卷",
        action: () => setConsultTab("visit"),
      };
    if (!bagangComplete)
      return {
        label: "继续八纲健康问卷",
        action: () => setConsultTab("bagang"),
      };
    if (!tongueCaptureComplete)
      return { label: "去采集舌象", action: () => setConsultTab("overview") };
    return {
      label: "开始AI辨证",
      action: () => {
        setConsultTab("overview");
        setShowSyndromeResult(true);
      },
    };
  };

  const primaryAction = getPrimaryAction();

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="健康问卷" subtitle="采集与辩证" />
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-4 gap-2 rounded-2xl bg-slate-100 p-1 text-[12px]">
          {[
            ["overview", "首页"],
            ["profile", "档案"],
            ["visit", "本次"],
            ["bagang", "八纲"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setConsultTab(key)}
              className={`rounded-2xl px-2 py-2 font-medium ${
                consultTab === key ? "bg-white shadow-sm" : "text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {consultTab === "overview" && (
          <>
            <IntroCard title="本次健康问卷" badge="核心" />

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">个人档案</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">基础信息</div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      profileComplete ? badgeDoneClass : badgePendingClass
                    }
                  >
                    {profileComplete ? "已完成" : "待完善"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border p-4">
                    <div className="font-medium">基础资料</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {profileData.gender} · {profileData.age}岁 · BMI{" "}
                      {profileData.bmi}
                    </div>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="font-medium">健康档案</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      既往病史：{profileData.history}；过敏史：
                      {profileData.allergy}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl"
                  onClick={() => setConsultTab("profile")}
                >
                  查看档案
                </Button>
              </CardContent>
            </Card>

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">本次健康问卷</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">主诉</div>
                      <Badge
                        variant="secondary"
                        className={
                          visitComplete ? badgeDoneClass : badgePendingClass
                        }
                      >
                        {visitComplete ? "已完成" : "待填写"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 leading-5">
                      {visitData.chiefComplaint || "待填写"}
                    </div>
                  </div>
                  <div className="rounded-2xl border p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">八纲</div>
                      <Badge
                        variant="secondary"
                        className={
                          bagangComplete ? badgeDoneClass : badgePendingClass
                        }
                      >
                        {bagangComplete ? "已完成" : "待填写"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      8 项
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 rounded-2xl"
                    onClick={() => setConsultTab("visit")}
                  >
                    填写主诉
                  </Button>
                  <Button
                    className="flex-1 rounded-2xl"
                    onClick={() => setConsultTab("bagang")}
                  >
                    填写八纲
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">舌象采集</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {tongueCaptureComplete ? "已上传" : "请拍摄清晰舌象"}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      tongueCaptureComplete ? badgeDoneClass : badgePendingClass
                    }
                  >
                    {tongueCaptureComplete ? "已完成" : "待上传"}
                  </Badge>
                </div>
                <button
                  type="button"
                  className="w-full rounded-2xl border-2 border-dashed p-6 text-center bg-slate-50"
                  onClick={() => {
                    setTongueCaptureComplete(true);
                    setShowSyndromeResult(false);
                  }}
                >
                  <div className="text-sm font-medium">拍照或上传</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    自然光拍摄更清晰
                  </div>
                </button>
              </CardContent>
            </Card>

            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">手指医生数据</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div />
                  <Badge
                    variant="secondary"
                    className={
                      fingerDoctorDataReady ? badgeDoneClass : badgePendingClass
                    }
                  >
                    {fingerDoctorDataReady ? "已完成" : "待同步"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl border p-3 bg-white">
                    <div className="text-slate-500">最近同步</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">
                      2026/04/14 10:32
                    </div>
                  </div>
                  <div className="rounded-2xl border p-3 bg-white">
                    <div className="text-slate-500">来源</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">
                      手指医生设备
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full rounded-2xl"
              disabled={!profileComplete && !visitComplete}
              onClick={primaryAction.action}
            >
              {primaryAction.label}
            </Button>

            {showSyndromeResult && canRunSyndromeAnalysis && (
              <Card className={sectionCard}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">辨证结果</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-2xl bg-amber-50 border p-4 text-sm leading-6">
                    <div className="font-semibold">肝郁脾虚、湿困中焦</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      睡眠浅、胃胀、疲劳感重
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="rounded-2xl border p-3 text-center">
                      睡眠 2/5
                    </div>
                    <div className="rounded-2xl border p-3 text-center">
                      脾胃 3/5
                    </div>
                    <div className="rounded-2xl border p-3 text-center">
                      情绪 2/5
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {consultTab === "profile" && (
          <>
            <IntroCard
              title="个人档案"
              desc="长期信息，低频维护"
              badge="档案"
            />
            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">基础资料</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["性别", profileData.gender],
                  ["年龄", `${profileData.age}岁`],
                  ["BMI", profileData.bmi],
                  ["过敏史", profileData.allergy],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border p-4 bg-white">
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="mt-2 font-medium">{value}</div>
                  </div>
                ))}
                <div className="rounded-2xl border p-4 bg-white col-span-2">
                  <div className="text-xs text-muted-foreground">既往病史</div>
                  <div className="mt-2 font-medium">{profileData.history}</div>
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full rounded-2xl"
              onClick={() => {
                setProfileComplete(true);
                setConsultTab("visit");
              }}
            >
              保存并继续
            </Button>
          </>
        )}

        {consultTab === "visit" && (
          <>
            <IntroCard
              title="本次健康问卷"
              desc="记录本次症状变化"
              badge="本次"
            />
            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">健康问卷信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">主诉</div>
                    <Badge
                      variant="secondary"
                      className={
                        visitData.chiefComplaint
                          ? badgeDoneClass
                          : badgePendingClass
                      }
                    >
                      {visitData.chiefComplaint ? "已完成" : "待填写"}
                    </Badge>
                  </div>
                  <textarea
                    className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                    rows={3}
                    placeholder="例如：胃胀、乏力、睡眠差"
                    value={visitData.chiefComplaint}
                    onChange={(e) =>
                      setVisitData((prev) => ({
                        ...prev,
                        chiefComplaint: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">现病史</div>
                    <Badge
                      variant="secondary"
                      className={
                        visitData.presentIllness
                          ? badgeDoneClass
                          : badgePendingClass
                      }
                    >
                      {visitData.presentIllness ? "已完成" : "待填写"}
                    </Badge>
                  </div>
                  <textarea
                    className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                    rows={4}
                    placeholder="例如：近两周加重，夜间难入睡，白天疲劳明显"
                    value={visitData.presentIllness}
                    onChange={(e) =>
                      setVisitData((prev) => ({
                        ...prev,
                        presentIllness: e.target.value,
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full rounded-2xl"
              disabled={!visitComplete}
              onClick={() => {
                setConsultTab("bagang");
              }}
            >
              保存并继续
            </Button>
          </>
        )}

        {consultTab === "bagang" && (
          <>
            <IntroCard title="八纲前置辩证" desc="8 个维度" badge="填写" />
            <Card className={sectionCard}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">健康问卷进度</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">填写进度</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      共 8 项，已完成 2 项
                    </div>
                  </div>
                  <Badge variant="secondary" className={badgePendingClass}>
                    进行中
                  </Badge>
                </div>
                <Progress value={25} />
                <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                  {sectionStats.map(([name, count], idx) => (
                    <div
                      key={name}
                      className={`rounded-2xl border p-3 ${
                        idx < 2 ? "bg-slate-100" : "bg-white"
                      }`}
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
                <CardTitle className="text-base">当前：寒热健康问卷</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">H_001 恶寒情况</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        请选择一项
                      </div>
                    </div>
                    <Badge variant="secondary" className={fieldBadgeClass}>
                      单选
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className={optionChip}>无恶寒</div>
                    <div
                      className={`${optionChip} border-slate-900 bg-slate-900 text-white`}
                    >
                      恶寒轻微
                    </div>
                    <div className={optionChip}>恶寒明显</div>
                    <div className={optionChip}>恶寒重剧</div>
                  </div>
                </div>
                <div className="rounded-2xl border p-4 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">H_003 发热情况</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        用于判断寒热偏性
                      </div>
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
                      <div className="text-sm font-medium">
                        H_005 恶寒与发热关系
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        用于判断寒热关系
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
                setBagangComplete(true);
                setConsultTab("overview");
                setShowSyndromeResult(false);
              }}
            >
              完成本次健康问卷
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function PlanScreen({ goToTherapyWithProject }) {
  const [expanded, setExpanded] = useState(false);

  const syndromeResult = {
    title: "肝郁脾虚、湿困中焦",
    summary: "以睡眠浅、胃胀、疲劳感重为主要表现",
    detail:
      "综合本次健康问卷信息与舌象特征，判断当前以肝郁脾虚为主，兼有湿困中焦。长期情绪压力导致气机不畅，影响脾胃运化功能，进而出现胃胀、疲劳、睡眠质量下降等表现。建议以疏肝理气、健脾祛湿为主要调理方向，并结合外治疗法与日常功法进行综合干预。",
    tags: ["睡眠", "脾胃", "情绪"],
  };

  const planBuckets = [
    {
      key: "internal",
      title: "内服",
      desc: "疏肝健脾调理",
      sample: "健脾祛湿方",
      action: "去查看",
    },
    {
      key: "external",
      title: "外治",
      desc: "艾灸+推拿",
      sample: "助眠舒缓调理",
      action: "去预约",
    },
    {
      key: "exercise",
      title: "功法",
      desc: "日常调养",
      sample: "八段锦 · 第1式",
      action: "开始练习",
    },
  ];

  const historyPlans = [
    ["2026/04/08", "初始辨证方案", "以内服、外治、功法联合调理为主"],
    ["2026/04/06", "历史调理记录", "以健脾调理与助眠外治为主"],
  ];

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="方案" subtitle="AI辩证分析与疗养方案" />
      <div className="p-4 space-y-4">
        <IntroCard
          title="本次调理方案"
          desc="基于本次辨证结果生成"
          badge="今日"
        />

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">本次辨证结果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl bg-amber-50 border p-4 text-sm leading-6">
              <div className="font-semibold">{syndromeResult.title}</div>
              <div className="text-xs text-muted-foreground mt-2">
                {syndromeResult.summary}
              </div>
              <div
                className={`text-xs text-slate-600 mt-3 leading-5 transition-all ${
                  expanded ? "" : "line-clamp-2"
                }`}
              >
                {syndromeResult.detail}
              </div>
              <button
                className="text-xs text-slate-500 mt-2"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "收起" : "展开"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {syndromeResult.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className={badgeIdleClass}>
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardContent className="p-5">
            <div className="text-base font-semibold">本次调理方案</div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {planBuckets.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl bg-white border p-3 flex flex-col justify-between h-[140px]"
                >
                  <div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                      {item.desc}
                    </div>
                    <div className="text-xs mt-2 font-medium text-slate-800 line-clamp-1">
                      {item.sample}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full rounded-xl mt-2"
                    onClick={() => {
                      if (item.key === "external")
                        goToTherapyWithProject("sleep");
                    }}
                  >
                    {item.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TherapyScreen({ prefill, clearPrefill }) {
  const dateOptions = useMemo(() => {
    const weekdayMap = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const labelMap = ["今天", "明天", "后天"];
    return Array.from({ length: 5 }).map((_, idx) => {
      const d = new Date();
      d.setDate(d.getDate() + idx);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return {
        label: labelMap[idx] || `${mm}/${dd}`,
        sub: `${mm}/${dd} ${weekdayMap[d.getDay()]}`,
      };
    });
  }, []);

  const therapyProjects = [
    {
      id: "sleep",
      name: "助眠舒缓项目",
      desc: "适合睡眠浅、夜醒频繁、压力偏大时选择",
    },
    {
      id: "spleen",
      name: "健脾和中调理",
      desc: "适合胃胀、疲劳感重、饮食不规律时选择",
    },
    { id: "mood", name: "情绪舒缓调理", desc: "适合情绪紧张、胸闷不舒时选择" },
  ];

  const therapyInstitutions = [
    {
      id: "hotel",
      name: "XX康养酒店调理中心",
      desc: "距离 280m · 可承接助眠舒缓 / 经络调理",
      tags: ["助眠舒缓", "经络调理"],
    },
    {
      id: "herb",
      name: "本草养生馆",
      desc: "距离 1.2km · 可承接脾胃调理 / 情绪舒缓",
      tags: ["健脾和中", "情绪舒缓"],
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [authorizedInstitution, setAuthorizedInstitution] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("14:00");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showBookingSheet, setShowBookingSheet] = useState(false);
  const [showAuthorizeDialog, setShowAuthorizeDialog] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: "a1",
      institution: "XX康养酒店调理中心",
      project: "助眠舒缓项目",
      time: "今天 04/15 周三 14:00",
      status: "pending",
    },
    {
      id: "a2",
      institution: "本草养生馆",
      project: "健脾和中调理",
      time: "2026/04/10 15:00",
      status: "accepted",
    },
    {
      id: "a3",
      institution: "本草养生馆",
      project: "情绪舒缓调理",
      time: "2026/04/08 14:30",
      status: "cancelled",
    },
  ]);

  useEffect(() => {
    if (prefill?.projectId) {
      setSelectedProject(prefill.projectId);
      setSelectedInstitution(null);
      setAuthorizedInstitution(null);
      setSelectedDate("");
      setSelectedSlot("14:00");
      setShowTimePicker(false);
      setShowBookingSheet(false);
      setShowAuthorizeDialog(false);
      if (clearPrefill) clearPrefill();
    }
  }, [prefill, clearPrefill]);

  useEffect(() => {
    if (!selectedDate && dateOptions.length > 0) {
      setSelectedDate(`${dateOptions[0].label} ${dateOptions[0].sub}`);
    }
  }, [selectedDate, dateOptions]);

  const selectedProjectInfo = therapyProjects.find(
    (item) => item.id === selectedProject
  );
  const selectedInstitutionInfo = therapyInstitutions.find(
    (item) => item.id === selectedInstitution
  );
  const selectedTime =
    selectedDate && selectedSlot ? `${selectedDate} ${selectedSlot}` : "";
  const latestAppointment = appointments[0] || null;
  const historyAppointments = appointments.slice(1);
  const [appointmentTab, setAppointmentTab] = useState("latest");
  const isAuthorized = authorizedInstitution === selectedInstitution;
  const canReserve =
    !!selectedProject &&
    !!selectedInstitution &&
    isAuthorized &&
    !!selectedTime;

  const handleCancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "cancelled" } : item
      )
    );
  };

  const handleSubmitAppointment = () => {
    if (!canReserve || !selectedInstitutionInfo || !selectedProjectInfo) return;
    setAppointments((prev) => [
      {
        id: `a${Date.now()}`,
        institution: selectedInstitutionInfo.name,
        project: selectedProjectInfo.name,
        time: selectedTime,
        status: "pending",
      },
      ...prev,
    ]);
    setShowBookingSheet(false);
  };

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="调理" subtitle="项目、机构、授权与预约" />
      <div className="p-4 space-y-4">
        <IntroCard
          title="项目 ➡️ 机构 ➡️ 授权"
          desc="授权后即可预约线下养生服务"
          badge="调理"
        />

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">推荐调理项目</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {therapyProjects.map((item) => {
              const active = selectedProject === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedProject(item.id)}
                  className={`w-full text-left flex items-start gap-3 rounded-2xl border p-4 transition ${
                    active ? "border-slate-900 bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className={iconChip}>
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium">{item.name}</div>
                      <Badge
                        variant="secondary"
                        className={active ? badgeSelectedClass : badgeIdleClass}
                      >
                        {active ? "已选择" : "待选择"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 leading-5">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">附近调理机构</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {therapyInstitutions.map((item) => {
              const active = selectedInstitution === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedInstitution(item.id);
                    if (
                      authorizedInstitution &&
                      authorizedInstitution !== item.id
                    ) {
                      setAuthorizedInstitution(null);
                    }
                    setShowBookingSheet(true);
                  }}
                  className={`w-full text-left rounded-2xl border p-4 transition ${
                    active ? "border-slate-900 bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`${iconChip} shrink-0 self-start`}>
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
                          <MapPin className="h-3 w-3 shrink-0 mt-1" />
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
                    <Badge
                      variant="secondary"
                      className={active ? badgeSelectedClass : badgeIdleClass}
                    >
                      {active ? "已选择" : "待选择"}
                    </Badge>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">我的预约</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 text-[12px]">
              {[
                ["latest", "最近预约"],
                ["history", "历史预约"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setAppointmentTab(key)}
                  className={`rounded-2xl px-2 py-2 font-medium ${
                    appointmentTab === key
                      ? "bg-white shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {appointmentTab === "latest" && (
              <div>
                {latestAppointment ? (
                  <div className="rounded-2xl border bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">
                          {latestAppointment.institution}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {latestAppointment.project}
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          latestAppointment.status === "accepted"
                            ? badgeDoneClass
                            : latestAppointment.status === "cancelled"
                            ? badgeIdleClass
                            : badgePendingClass
                        }
                      >
                        {latestAppointment.status === "accepted"
                          ? "已接单"
                          : latestAppointment.status === "cancelled"
                          ? "已取消"
                          : "待确认"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-3">
                      预约时间：{latestAppointment.time}
                    </div>
                    {latestAppointment.status === "pending" && (
                      <Button
                        variant="outline"
                        className="w-full rounded-2xl mt-3"
                        onClick={() =>
                          handleCancelAppointment(latestAppointment.id)
                        }
                      >
                        取消预约
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl border bg-white p-4 text-xs text-muted-foreground">
                    暂无预约记录
                  </div>
                )}
              </div>
            )}

            {appointmentTab === "history" && (
              <div className="space-y-3">
                {historyAppointments.length > 0 ? (
                  historyAppointments.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium">
                            {item.institution}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.project}
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            item.status === "accepted"
                              ? badgeDoneClass
                              : item.status === "cancelled"
                              ? badgeIdleClass
                              : badgePendingClass
                          }
                        >
                          {item.status === "accepted"
                            ? "已接单"
                            : item.status === "cancelled"
                            ? "已取消"
                            : "待确认"}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-3">
                        预约时间：{item.time}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border bg-white p-4 text-xs text-muted-foreground">
                    暂无历史预约
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {showBookingSheet && selectedInstitutionInfo && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setShowBookingSheet(false)}
            />
            <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white shadow-2xl max-h-[78vh] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <button
                  type="button"
                  className="text-sm text-slate-500"
                  onClick={() => setShowBookingSheet(false)}
                >
                  关闭
                </button>
                <div className="text-sm font-medium">预约提交</div>
                <div className="w-8" />
              </div>
              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(78vh-64px)]">
                <div className="rounded-2xl border p-4 bg-slate-50">
                  <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                    <div>
                      项目：
                      {selectedProjectInfo
                        ? selectedProjectInfo.name
                        : "暂未选择"}
                    </div>
                    <div>机构：{selectedInstitutionInfo.name}</div>
                    <div>时间：{selectedTime || "请选择时间"}</div>
                  </div>
                </div>

  
                <div className="rounded-2xl border p-4 bg-white">
                  <div className="text-sm font-medium">选择预约时间</div>
                  <button
                    type="button"
                    onClick={() => setShowTimePicker(true)}
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm flex items-center justify-between"
                  >
                    <span
                      className={
                        selectedTime ? "text-slate-800" : "text-slate-400"
                      }
                    >
                      {selectedTime || "请选择到店时间"}
                    </span>
                    <span className="text-slate-400">›</span>
                  </button>
                </div>

                <Button
                  className="w-full rounded-2xl"
                  disabled={!canReserve}
                  onClick={handleSubmitAppointment}
                >
                  提交预约
                </Button>
              </div>
            </div>
          </>
        )}

        {showAuthorizeDialog && selectedInstitutionInfo && (
          <>
            <div
              className="fixed inset-0 z-[60] bg-black/30"
              onClick={() => setShowAuthorizeDialog(false)}
            />

          </>
        )}

        {showTimePicker && (
          <>
            <div
              className="fixed inset-0 z-[80] bg-black/30"
              onClick={() => setShowTimePicker(false)}
            />
            <div className="fixed inset-x-0 bottom-0 z-[90] rounded-t-3xl bg-white shadow-2xl">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <button
                  type="button"
                  className="text-sm text-slate-500"
                  onClick={() => setShowTimePicker(false)}
                >
                  取消
                </button>
                <div className="text-sm font-medium">选择预约时间</div>
                <button
                  type="button"
                  className="text-sm text-slate-900"
                  onClick={() => setShowTimePicker(false)}
                >
                  确定
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 px-4 py-4 h-[260px]">
                <div className="rounded-2xl bg-slate-50 p-2 overflow-y-auto">
                  {dateOptions.map((item) => {
                    const value = `${item.label} ${item.sub}`;
                    const active = selectedDate === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelectedDate(value)}
                        className={`w-full rounded-xl px-3 py-3 text-left mb-2 ${
                          active
                            ? "bg-slate-900 text-white"
                            : "bg-white text-slate-700 border border-slate-200"
                        }`}
                      >
                        <div className="text-sm font-medium">{item.label}</div>
                        <div
                          className={`text-[11px] mt-1 ${
                            active ? "text-white/80" : "text-slate-400"
                          }`}
                        >
                          {item.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-2xl bg-slate-50 p-2 overflow-y-auto">
                  {[
                    "09:00",
                    "09:30",
                    "10:00",
                    "10:30",
                    "11:00",
                    "11:30",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                    "17:00",
                    "17:30",
                    "18:00",
                    "18:30",
                    "19:00",
                  ].map((slot) => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full rounded-xl px-3 py-3 text-sm mb-2 ${
                          active
                            ? "bg-slate-900 text-white"
                            : "bg-white text-slate-700 border border-slate-200"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function RecordScreen() {
  const recordTabs = [
    ["all", "全部"],
    ["consult", "健康问卷"],
    ["plan", "方案"],
    ["therapy", "调理"],
  ];
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const timelineItems = [
    {
      id: "r1",
      type: "consult",
      date: "2026/04/15",
      title: "本次健康问卷记录",
      desc: "主诉、现病史、八纲与舌象已完成采集",
      tags: ["健康问卷", "舌象"],
      result: "肝郁脾虚、湿困中焦",
      detail: {
        sections: [
          ["主诉", "胃胀、睡眠浅、易疲劳"],
          ["现病史", "近两周工作压力增大后加重，伴随入睡困难与白天乏力"],
          ["辨证结果", "肝郁脾虚、湿困中焦"],
        ],
      },
    },
    {
      id: "r2",
      type: "plan",
      date: "2026/04/15",
      title: "本次调理方案",
      desc: "内服、外治、功法三类方案已生成",
      tags: ["方案"],
      result: "健脾祛湿方 / 助眠舒缓调理 / 八段锦第1式",
      detail: {
        sections: [
          ["内服", "健脾祛湿方（参考）"],
          ["外治", "助眠舒缓调理"],
          ["功法", "八段锦 · 第1式"],
        ],
      },
    },
    {
      id: "r3",
      type: "therapy",
      date: "2026/04/10",
      title: "调理预约记录",
      desc: "XX康养酒店调理中心 · 助眠舒缓项目",
      tags: ["调理", "预约"],
      result: "已完成到店服务",
      detail: {
        sections: [
          ["预约机构", "XX康养酒店调理中心"],
          ["调理项目", "助眠舒缓项目"],
          ["服务状态", "已完成到店服务"],
        ],
      },
    },
    {
      id: "r4",
      type: "consult",
      date: "2026/04/08",
      title: "历史健康问卷记录",
      desc: "睡眠浅、疲劳感重，完成基础健康问卷",
      tags: ["健康问卷"],
      result: "脾胃湿困",
      detail: {
        sections: [
          ["主诉", "睡眠浅、疲劳感重"],
          ["辨证结果", "脾胃湿困"],
          ["处理建议", "继续调理脾胃与睡眠"],
        ],
      },
    },
  ];

  const filteredItems =
    activeTab === "all"
      ? timelineItems
      : timelineItems.filter((item) => item.type === activeTab);

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="档案" subtitle="健康记录与历史轨迹" />
      <div className="p-4 space-y-4">
        <Card className="rounded-3xl border-0 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarFallback>李</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold">李女士</div>
                <div className="text-xs text-muted-foreground mt-1">
                  32岁 · 肝郁脾虚倾向 · 持续调理中
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="rounded-2xl border bg-white p-3">
                <div className="text-lg font-semibold">3</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  累计健康问卷
                </div>
              </div>
              <div className="rounded-2xl border bg-white p-3">
                <div className="text-lg font-semibold">5</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  方案记录
                </div>
              </div>
              <div className="rounded-2xl border bg-white p-3">
                <div className="text-lg font-semibold">1</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  调理记录
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-4 gap-2 rounded-2xl bg-slate-100 p-1 text-[12px]">
          {recordTabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`rounded-2xl px-2 py-2 font-medium ${
                activeTab === key ? "bg-white shadow-sm" : "text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">历史记录</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedRecord(item)}
                className="w-full rounded-2xl border bg-white p-4 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.date}
                    </div>
                  </div>
                  <Badge variant="secondary" className={badgeIdleClass}>
                    {item.type === "consult"
                      ? "健康问卷"
                      : item.type === "plan"
                      ? "方案"
                      : "调理"}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-3 leading-5">
                  {item.desc}
                </div>
                <div className="rounded-xl bg-slate-50 border px-3 py-2 mt-3 text-xs text-slate-700 leading-5">
                  {item.result}
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
                <div className="text-xs text-slate-500 mt-3">点击查看详情</div>
              </button>
            ))}
          </CardContent>
        </Card>

        {selectedRecord && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setSelectedRecord(null)}
            />
            <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white shadow-2xl max-h-[75vh] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <button
                  type="button"
                  className="text-sm text-slate-500"
                  onClick={() => setSelectedRecord(null)}
                >
                  关闭
                </button>
                <div className="text-sm font-medium">记录详情</div>
                <div className="w-8" />
              </div>
              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(75vh-64px)]">
                <div>
                  <div className="text-base font-semibold">
                    {selectedRecord.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {selectedRecord.date}
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 border p-4 text-sm leading-6">
                  {selectedRecord.desc}
                </div>
                <div className="space-y-3">
                  {selectedRecord.detail?.sections?.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border bg-white p-4"
                    >
                      <div className="text-xs text-muted-foreground">
                        {label}
                      </div>
                      <div className="text-sm text-slate-800 mt-2 leading-6">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MeScreen({ onNavigate }) {
  const quickEntries = [
    ["我的档案", "查看健康记录", "record"],
    ["我的预约", "调理预约与到店", "therapy"],
    ["授权管理", "查看已授权机构", "therapy"],
    ["我的订单", "商城与服务订单", "me"],
  ];

  const settingsEntries = ["账号设置", "消息通知", "联系客服", "用户协议"];

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <MiniTopBar title="我的" subtitle="账户、权益与常用入口" />
      <div className="p-4 space-y-4">
        <Card className="rounded-3xl border-0 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarFallback>李</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold">李女士</div>
                <div className="text-xs text-muted-foreground mt-1">
                  持续调理中 · 睡眠与脾胃重点关注
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-sm bg-gradient-to-br from-violet-50 to-fuchsia-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-semibold">银卡会员</div>
                <div className="text-xs text-muted-foreground mt-1">
                  积分 1,280 · 可享会员权益
                </div>
              </div>
              <Badge variant="secondary" className={badgeIdleClass}>
                会员中心
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-center">
              <div className="rounded-2xl bg-white/80 border p-3">
                <div className="text-base font-semibold">3</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  可用优惠
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 border p-3">
                <div className="text-base font-semibold">2</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  待使用权益
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">常用入口</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickEntries.map(([title, desc, target]) => (
                <button
                  key={title}
                  onClick={() => onNavigate?.(target)}
                  className="rounded-2xl border bg-white p-4 text-left"
                >
                  <div className="text-sm font-medium">{title}</div>
                  <div className="text-[11px] text-muted-foreground mt-2">
                    {desc}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={sectionCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">设置与帮助</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {settingsEntries.map((item) => (
              <button
                key={item}
                className="w-full rounded-2xl border bg-white px-4 py-3 text-left text-sm flex items-center justify-between"
              >
                <span>{item}</span>
                <span className="text-slate-400">›</span>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MiniProgramPrototype() {
  const [tab, setTab] = useState("consult");
  const [therapyPrefill, setTherapyPrefill] = useState(null);

  const goToTherapyWithProject = (projectId) => {
    setTherapyPrefill({ projectId });
    setTab("therapy");
  };

  const clearTherapyPrefill = () => setTherapyPrefill(null);

  const screen = useMemo(() => {
    switch (tab) {
      case "plan":
        return <PlanScreen goToTherapyWithProject={goToTherapyWithProject} />;
      case "therapy":
        return (
          <TherapyScreen
            prefill={therapyPrefill}
            clearPrefill={clearTherapyPrefill}
          />
        );
      case "record":
        return <RecordScreen />;
      case "me":
        return <MeScreen onNavigate={setTab} />;
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
                  className={`rounded-2xl px-2 py-2 text-center transition ${
                    active ? "bg-slate-100" : ""
                  }`}
                >
                  <Icon
                    className={`mx-auto h-5 w-5 ${
                      active ? "opacity-100" : "opacity-50"
                    }`}
                  />
                  <div
                    className={`mt-1 text-[11px] ${
                      active ? "font-medium" : "text-muted-foreground"
                    }`}
                  >
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
        <Stat label="健康问卷完成率" value="82%" sub="核心看采集完成情况" />
        <Stat label="方案生成率" value="74%" sub="核心看核心引擎产出" />
        <Stat label="调理承接率" value="41%" sub="核心看场景转化" />
      </div>
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
            <Input
              placeholder="搜索用户姓名 / 手机号 / 用户ID"
              className="border-0 shadow-none px-0"
            />
          </div>
          <Button className="rounded-xl">新增用户</Button>
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
          {["基础健康问卷单", "女性专项问卷", "睡眠专项问卷"].map((x) => (
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
          {["今日上传 58 张", "异常图片 6 张", "待复核 12 条"].map((x) => (
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
          {["肝郁脾虚 31%", "脾胃湿困 24%", "气血不足 19%"].map((x) => (
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
          {["舒肝解郁方案", "健脾安神方案", "睡眠修复方案"].map((x) => (
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
          {[
            "睡眠差 → 助眠优先",
            "胃胀重 → 健脾优先",
            "情绪波动大 → 舒肝优先",
          ].map((x) => (
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
          {["康养酒店 6 家", "养生馆 12 家", "待审核机构 3 家"].map((x) => (
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
          {["助眠舒缓", "健脾和中", "情绪舒缓"].map((x) => (
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
          {["今日授权 39 次", "预约转化 21 单", "撤回授权 4 次"].map((x) => (
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
          {[
            "健康问卷记录 12,486 条",
            "舌象记录 6,203 条",
            "历史方案 28,730 份",
            "评估报告 3,120 份",
          ].map((x) => (
            <div key={x} className="rounded-2xl border p-3">
              {x}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>数据质量</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {["完整度 96%", "可追溯率 99%", "重复用户识别 98%"].map((x) => (
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
          {["银卡会员 820 人", "金卡会员 216 人", "复购意向 129 人"].map(
            (x) => (
              <div key={x} className="rounded-2xl border p-3">
                {x}
              </div>
            )
          )}
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>商品与服务包</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {["草本安睡茶", "脾胃调养足浴包", "睡眠改善服务包"].map((x) => (
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
      {[
        "角色权限",
        "接口配置",
        "字典配置",
        "消息模板",
        "问卷题库",
        "授权规则",
      ].map((x) => (
        <Card key={x} className="rounded-2xl shadow-sm">
          <CardContent className="p-5">
            <div className="text-sm font-medium">{x}</div>
            <div className="text-xs text-muted-foreground mt-2">
              预留配置页原型入口
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AdminPrototype() {
  const [menu, setMenu] = useState("dashboard");

  const content = useMemo(() => {
    switch (menu) {
      case "users":
        return <UsersPage />;
      case "consult":
        return <ConsultCenterPage />;
      case "plan":
        return <PlanCenterPage />;
      case "therapy":
        return <TherapyCenterPage />;
      case "record":
        return <RecordCenterPage />;
      case "commerce":
        return <CommercePage />;
      case "system":
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
            <div className="text-lg font-semibold tracking-tight">
              平台运营后台
            </div>
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
                    active ? "bg-white shadow-sm border" : "hover:bg-white/70"
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
              <div className="text-lg font-semibold">
                {adminMenus.find((x) => x.key === menu)?.label}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Input
                placeholder="搜索功能或用户"
                className="w-64 rounded-2xl"
              />
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

export function TCMPrototypePage({ defaultView = "mini" }) {
  const [view, setView] = useState(defaultView);

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-3xl font-semibold tracking-tight">
              中医健康服务平台 · 产品原型
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              健康问卷模块已按长期档案与本次健康问卷拆分
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={view === "mini" ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setView("mini")}
            >
              用户小程序
            </Button>
            <Button
              variant={view === "admin" ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setView("admin")}
            >
              平台后台
            </Button>
            <Button
              variant={view === "both" ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setView("both")}
            >
              双端同看
            </Button>
          </div>
        </div>

        {view === "mini" && (
          <div className="flex justify-center">
            <MiniProgramPrototype />
          </div>
        )}
        {view === "admin" && <AdminPrototype />}
        {view === "both" && (
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

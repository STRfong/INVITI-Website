import React, { useState, useEffect } from 'react';
import eventSessionGif from '../../assets/Feature/創建活動_Gif版.gif';
import autoInviteImage from '../../assets/functions/一鍵邀請與追蹤出席狀況.png.webp';
import guestDbImage from '../../assets/functions/貴賓資料庫.png.webp';
import eventManagementImage from '../../assets/functions/活動管理.png.webp';
import { Calendar, Mail, Database, ZoomIn } from 'lucide-react';
import { FeatureCard } from '../wireframe/FeatureCard';
import { Locale, getTranslations } from '../../locales/translations';
import { ImageLightbox } from '../wireframe/ImageLightbox';

export type FeatureContentId =
  | 'event-session-management'
  | 'automated-invitations'
  | 'guest-database';

interface FeatureContentPageProps {
  featureId: FeatureContentId;
  isMobile?: boolean;
  locale?: Locale;
  onBack?: () => void;
  onNavigate?: (path: string) => void;
}

interface LocalizedSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

interface LocalizedFeaturePage {
  title: string;
  intro: string[];
  sections: LocalizedSection[];
  backLabel: string;
  moreFeaturesLabel: string;
}

const imageMap: Record<FeatureContentId, string> = {
  'event-session-management': eventSessionGif,
  'automated-invitations': autoInviteImage,
  'guest-database': guestDbImage
};

// YouTube video ID for automated-invitations
const youtubeVideoId = '4QObyx7sDhI';

// Screenshot images for feature cards (matching FeaturesSection.tsx)
const screenshotMap: Record<FeatureContentId, string> = {
  'event-session-management': eventManagementImage,
  'automated-invitations': autoInviteImage,
  'guest-database': guestDbImage
};

function getLocalizedContent(
  locale: Locale,
  featureId: FeatureContentId
): LocalizedFeaturePage {
  // zh-hans 使用簡中內容；ja 有獨立日文文案
  const lang = locale;

  if (lang === 'en') {
    if (featureId === 'event-session-management') {
      return {
        title: 'Event & Session Management',
        intro: [
          'INVITI treats every event as a dedicated project. When you create an event, you can configure all key details at once — date, venue, doors-open and show time, invitation artwork, and more. At the same time, the system automatically generates the corresponding RSVP form so your invitation workflow is ready to go.'
        ],
        sections: [
          {
            heading:
              'Challenges when managing events with Google Forms & spreadsheets',
            bullets: [
              'Each event ends up with multiple guest lists, RSVP forms, and invitation images scattered across different folders, making it hard to manage and even harder to know which version is the latest.',
              'After collecting RSVPs in Google Forms, you still need to move data elsewhere to clean it up and send emails. The workflow is fragmented and time‑consuming.',
              'Know‑how and rules are often locked in one person’s head, making it difficult to share workload and forcing a single coordinator to handle everything.'
            ]
          },
          {
            heading: 'INVITI gives you true end‑to‑end event management',
            body:
              'INVITI links guest lists and RSVP forms under the same event/session, so organizers can manage guests and email flows from a single interface. Once email templates are set up, you can batch‑send invitations and confirmations without copying and pasting names one by one, greatly reducing human error and making the entire process clearer and easier to hand over.'
          }
        ],
        backLabel: 'Back to Product Features',
        moreFeaturesLabel: 'Other product features'
      };
    }

    if (featureId === 'automated-invitations') {
      return {
        title: 'One‑Click Invitations & Attendance Tracking',
        intro: [
          'With INVITI, you can select the guests you want to invite directly from the attendance list and send invitation, confirmation, or reminder emails with a single click, using predefined templates. The system automatically includes the correct RSVP form link. Email content is prepared in “Email Templates”, and variables pull in guest and event details automatically to avoid manual errors. When a guest submits the form—or when the inviter sends a confirmation—the system updates status and headcount automatically so every invitation has a clear trace.'
        ],
        sections: [
          {
            heading:
              'Challenges when inviting guests with regular email tools',
            bullets: [
              'Guest lists live in Google Sheets, RSVP forms in Google Forms, and emails in your inbox. The process is fragmented and it’s hard to see who has been invited and who hasn’t.',
              'After guests confirm attendance, someone has to manually update status and headcount one by one, which makes tracking total confirmed seats very time‑consuming.',
              'Sending reminder emails before the event is tedious and error‑prone, increasing the risk of sending the wrong content to the wrong people.'
            ]
          },
          {
            heading:
              'INVITI makes invitations and attendance tracking straightforward',
            body:
              'In INVITI, you can handle invitation, confirmation, and reminder flows directly from the “Guest Attendance List” and see live changes in status and ticket counts. From the first invitation to the final headcount before the event, everything happens in one interface, so your team can always see the latest attendance progress.'
          }
        ],
        backLabel: 'Back to Product Features',
        moreFeaturesLabel: 'Other product features'
      };
    }

    // guest database
    return {
      title: 'Guest Database',
      intro: [
        'INVITI turns all of your PR guests into a long‑term “Guest Database”, using email as the unique identifier to avoid duplicate records. You can add guests one by one, bulk import them, or sync new contacts automatically from RSVP forms.',
        'Fields are pre‑designed for PR workflows (name, organization, title, contact info, account owner, tags, etc.), and combined with tags and internal owner settings so each guest’s background, relationship, and interaction history can be captured instead of living only in a few colleagues’ memory.'
      ],
      sections: [
        {
          heading:
            'Challenges when managing a master guest list in Google Sheets or Excel',
          bullets: [
            'The same guest is duplicated across multiple events with inconsistent names, titles, or contact details, making it hard to know which record is the most up‑to‑date.',
            'Lists are scattered across Excel files, Google Sheets, and email attachments, so new teammates struggle to quickly understand existing relationships.',
            'When you want to target by industry, importance, owner, or region, you have to filter and tag sheet by sheet, spending time on data cleanup instead of relationship‑building.',
            'After an event, it’s hard to see a guest’s full “participation history” from one place, which makes follow‑up and analysis difficult.'
          ]
        },
        {
          heading:
            'INVITI turns guest information into a long‑term relationship asset',
          body:
            'With the Guest Database, all contacts live in a single system. Email prevents duplicate records, and you can quickly search and segment by tags, industry, importance, owner, and more. Each invitation and attendance record writes back to the same guest, building a clear interaction history. Whether someone new takes over, PR ownership changes, or multiple teams need to share lists, everyone can see a complete and up‑to‑date view of each relationship.'
        }
      ],
      backLabel: 'Back to Product Features',
      moreFeaturesLabel: 'Other product features'
    };
  }

  if (lang === 'zh-hans') {
    if (featureId === 'event-session-management') {
      return {
        title: '活动／场次管理',
        intro: [
          'INVITI 把每一场活动当成一个专案来管理。建立活动时，可以一次设定好活动资讯，例如：日期、地点、进场及演出时间、电子邀请函图片⋯⋯等。在活动建立完成的同时，系统也会自动产生对应的邀请表单，让后续邀请流程接上。'
        ],
        sections: [
          {
            heading:
              '使用 Google 表单管理活动时，你可能会遇到以下问题',
            bullets: [
              '一个活动有多个出席名单、邀请表单、邀请函图片，分散在不同云端资料夹中，难以管理，也难以追踪最新版本',
              '使用 Google 表单搜集贵宾出席意愿后，还需要再把资料转移到其他地方整理、寄信，流程零碎又花时间',
              '经验与规则都锁在同一个人身上，工作负担难以分担，只能由单一窗口一人作业'
            ]
          },
          {
            heading: 'INVITI 做到了一站式的管理',
            body:
              'INVITI 将出席名单与邀请表单勾稽在同一个活动／场次下，主办方可以在同一个介面，一站式管理贵宾名单与寄信流程。只要事先设定好信件模板，就能批次寄出邀请与确认信，不必再一笔一笔复制贴上名单，大幅减少人工错误，也让整体流程更清楚、更好交接。'
          }
        ],
        backLabel: '返回产品功能',
        moreFeaturesLabel: '其他产品功能'
      };
    }

    if (featureId === 'automated-invitations') {
      return {
        title: '一键邀请与追踪出席状况',
        intro: [
          'INVITI 让你在同一个出席名单页面，选好要邀请的贵宾后，就能用信件模板「一键寄出」邀请信、确认信或提醒信，并自动附上对应的邀请表单连结。信件内容可事先在「信件模板管理」设定，并利用内容变数自动带入贵宾与活动资讯，避免手动输入出错。贵宾填完表单，或由邀请人直接寄出确认信后，系统会自动更新出席状态与出席人数，让每一笔邀请都有清楚的纪录。'
        ],
        sections: [
          {
            heading:
              '用一般寄信工具邀请贵宾，你可能会遇到以下问题',
            bullets: [
              '名单在 Google Sheet、邀请表单在 Google Form、寄信在信箱，流程分散又难以回溯谁已寄出、谁尚未邀请',
              '贵宾回覆出席后，需要人工逐笔更新出席状态与人数，统计目前确认人数相当费时',
              '活动前想发提醒信，既耗时、寄错信的风险高'
            ]
          },
          {
            heading: 'INVITI 让邀请与出席追踪不再困难',
            body:
              '透过 INVITI，你可以在「贵宾出席名单」中直接完成邀请、确认与提醒三个步骤，并即时看到出席状态与票数变化。从寄出第一封邀请信，到活动前夕确认最终人数，都在同一个介面完成，让团队随时掌握活动最新出席进度。'
          }
        ],
        backLabel: '返回产品功能',
        moreFeaturesLabel: '其他产品功能'
      };
    }

    return {
      title: '贵宾资料库',
      intro: [
        'INVITI 把所有公关贵宾整理成一个可以长期累积的「贵宾资料库」，用 Email 当作唯一识别，避免重复建档。你可以用单笔新增、批量汇入，或透过邀请表单自动同步活动中的新贵宾资料。',
        '栏位已预先依照公关情境设计（姓名、单位、职称、联络方式、联络人、标签等），再搭配标签与内部窗口设定，让每一位贵宾的背景、关系与互动脉络都能被记录下来，而不是只存在某一两位同事的记忆里。'
      ],
      sections: [
        {
          heading:
            '如果在 Google Sheet 或 Excel 管理贵宾总表，你可能会遇到以下问题',
          bullets: [
            '同一位贵宾在不同活动被重复建立多笔资料，名称、职称或联络方式不一致，难以判断哪一笔才是最新',
            '名单散落在各种 Excel、Google 试算表与信箱附件中，新加入的同事很难快速掌握既有关係',
            '想依产业别、重要程度、邀请人或地区分组邀请时，只能一张张表格筛选、贴标记，时间花在整理资料，而不是经营关係',
            '活动结束后，无法从单一视角回头查看这位贵宾「历年参与纪录」，也难以做后续关係维护与资料分析'
          ]
        },
        {
          heading: 'INVITI 让贵宾资料变成可以长期累积的资产',
          body:
            '透过贵宾资料库，所有贵宾资讯被集中在同一套系统中，由 Email 自动避免重复建档，并可透过标签、产业别、重要程度、邀请人等条件快速搜寻与分组。每次邀请与出席状况也会回写到同一笔贵宾资料，形成清楚的互动历史。无论是新人接手、公关换人，或是跨部门需要共用名单，都能在同一个画面看到完整且最新的贵宾关係全貌。'
        }
      ],
      backLabel: '返回产品功能',
      moreFeaturesLabel: '其他产品功能'
    };
  }

  if (lang === 'ja') {
    if (featureId === 'event-session-management') {
      return {
        title: 'イベント／セッション管理',
        intro: [
          'INVITI は、1 つ 1 つのイベントを「プロジェクト」として管理します。イベント作成時に、日付・会場・開場／開演時間・デジタル招待状の画像など、必要な情報をまとめて設定できます。イベントを作成すると同時に、対応する招待フォームも自動生成され、そのまま招待フローにつなげることができます。'
        ],
        sections: [
          {
            heading: 'Google フォームでイベントを管理すると、こんな課題が起こりがちです',
            bullets: [
              '1 つのイベントに対して、出席リスト・招待フォーム・招待状の画像が複数存在し、それぞれが別々のクラウドフォルダに散らばっているため、管理が煩雑で最新版も分かりにくい',
              'Google フォームで出席可否を集めたあと、別の場所にデータを移して整え、メール配信する必要があり、プロセスが分断されて時間も手間もかかる',
              'ノウハウやルールが 1 人の担当者に属人化しており、作業を分担しにくく、いつも同じ窓口がすべてを抱え込んでしまう'
            ]
          },
          {
            heading: 'INVITI ならイベント情報を 1 か所にまとめて管理',
            body:
              'INVITI では、出席リストと招待フォームを同じイベント／セッション単位でひも付けて管理できます。主催者は 1 つの画面で、ゲストリストとメール送信フローを一元的に扱えます。あらかじめメールテンプレートを用意しておけば、招待メールや確認メールを一括送信でき、名簿を 1 件ずつコピー＆ペーストする必要はありません。ヒューマンエラーを大幅に減らし、プロセス全体がもっと分かりやすく、引き継ぎもしやすくなります。'
          }
        ],
        backLabel: '機能一覧に戻る',
        moreFeaturesLabel: 'その他の製品機能'
      };
    }

    if (featureId === 'automated-invitations') {
      return {
        title: 'ワンクリック招待と出席状況トラッキング',
        intro: [
          'INVITI なら、同じ出席リスト画面上で招待したいゲストを選び、テンプレートを使って「ワンクリック」で招待メール・確認メール・リマインドメールを送信できます。適切な招待フォームのリンクも自動で挿入されます。メール本文は「メールテンプレート管理」で事前に用意し、変数を使ってゲスト情報やイベント情報を自動差し込みできるので、手入力ミスを防げます。ゲストがフォームに回答したり、担当者が確認メールを送信すると、システムが出席ステータスと人数を自動更新し、1 件 1 件の招待に明確な履歴が残ります。'
        ],
        sections: [
          {
            heading: '一般的なメールツールで招待するときの課題',
            bullets: [
              'ゲストリストはスプレッドシート、招待フォームは Google フォーム、送信はメールクライアントと、プロセスがバラバラで「誰に送ったか／まだ送っていないか」を追いにくい',
              '出席の返信をもらったあと、担当者が手作業で出席ステータスや人数を更新する必要があり、現在の確定人数を集計するのに時間がかかる',
              'イベント直前にリマインドメールを送りたいが、工数も多く、宛先や内容を間違えるリスクも高い'
            ]
          },
          {
            heading: 'INVITI なら招待と出席管理を同じ画面で完結',
            body:
              'INVITI では、「ゲスト出席リスト」からそのまま招待・出席確認・リマインドの 3 ステップを完了でき、ステータスやチケット枚数の変化をリアルタイムに確認できます。最初の招待メール送信からイベント前日の最終人数確認まで、すべてを 1 つの画面で行えるため、チーム全員が常に最新の出席状況を把握できます。'
          }
        ],
        backLabel: '機能一覧に戻る',
        moreFeaturesLabel: 'その他の製品機能'
      };
    }

    return {
      title: 'ゲストデータベース',
      intro: [
        'INVITI は、すべての PR ゲストを長期的に蓄積できる「ゲストデータベース」として整理し、Email を一意の識別子として重複登録を防ぎます。1 件ずつの追加、CSV などからの一括インポート、招待フォームからの自動同期など、さまざまな方法でゲスト情報を集約できます。',
        '項目は PR の実務に合わせて事前設計されており（氏名、所属、役職、連絡先、担当者、タグなど）、タグや社内の担当設定と組み合わせることで、各ゲストの背景や関係性、これまでのやり取りの文脈を記録として残せます。特定のメンバーの記憶にだけ依存しない状態をつくることができます。'
      ],
      sections: [
        {
          heading: 'Google シートや Excel で「ゲスト一覧」を管理すると起こりがちな問題',
          bullets: [
            '同じゲストがイベントごとに別レコードとして重複登録され、名前・役職・連絡先がバラバラになり、どれが最新情報なのか分かりにくい',
            '名簿が複数の Excel ファイルや Google シート、メール添付などに散在しており、新しく入ったメンバーが既存の関係性を素早く把握しにくい',
            '業種・重要度・担当者・地域別などでセグメントして招待したいとき、各シートをフィルタ・タグ付けしながら作業する必要があり、時間の多くをデータ整備に取られてしまう',
            'イベント終了後に、そのゲストの「過去の参加履歴」を 1 つのビューで振り返ることが難しく、フォローアップや分析に活かしにくい'
          ]
        },
        {
          heading: 'INVITI ならゲスト情報を長期的な「関係資産」に変えられる',
          body:
            'ゲストデータベースでは、すべてのゲスト情報が 1 つのシステムに集約され、Email によって重複登録が自動的に防がれます。タグ・業種・重要度・担当者などの条件で素早く検索・絞り込みができ、各イベントでの招待や出席状況も同じレコードに書き戻されます。こうして明確なインタラクション履歴が蓄積されるため、新人の引き継ぎや担当変更、部門間での名簿共有が必要なときも、常に最新かつ全体像の見える関係管理が可能になります。'
        }
      ],
      backLabel: '機能一覧に戻る',
      moreFeaturesLabel: 'その他の製品機能'
    };
  }

  // Default: Traditional Chinese
  if (featureId === 'event-session-management') {
    return {
      title: '活動／場次管理',
      intro: [
        'INVITI 把每一場活動當成一個專案來管理。建立活動時，可以一次設定好活動資訊，例如：日期、地點、進場及演出時間、電子邀請函圖片⋯⋯等。在活動建立完成的同時，系統也會自動產生對應的邀請表單，讓後續邀請流程接上。'
      ],
      sections: [
        {
          heading: '使用 Google 表單管理活動時，你可能會遇到以下問題',
          bullets: [
            '一個活動有多個出席名單、邀請表單、邀請函圖片，分散在不同雲端資料夾中，難以管理，也難以追蹤最新版本',
            '使用 Google 表單蒐集貴賓出席意願後，還需要再把資料轉移到其他地方整理、寄信，流程零碎又花時間',
            '經驗與規則都鎖在同一個人身上，工作負擔難以分擔，只能由單一窗口一人作業'
          ]
        },
        {
          heading: 'INVITI 做到了一站式的管理',
          body:
            'INVITI 將出席名單與邀請表單勾稽在同一個活動／場次下，主辦方可以在同一個介面，一站式管理貴賓名單與寄信流程。只要事先設定好信件模板，就能批次寄出邀請與確認信，不必再一筆一筆複製貼上名單，大幅減少人工錯誤，也讓整體流程更清楚、更好交接。'
        }
      ],
      backLabel: '← 返回產品功能',
      moreFeaturesLabel: '其他產品功能'
    };
  }

  if (featureId === 'automated-invitations') {
    return {
      title: '一鍵邀請與追蹤出席狀況',
      intro: [
        'INVITI 讓你在同一個出席名單頁面，選好要邀請的貴賓後，就能用信件模板「一鍵寄出」邀請信、確認信或提醒信，並自動附上對應的邀請表單連結。信件內容可事先在「信件模板管理」設定，並利用內容變數自動帶入貴賓與活動資訊，避免手動輸入出錯。貴賓填完表單，或由邀請人直接寄出確認信後，系統會自動更新出席狀態與出席人數，讓每一筆邀請都有清楚的紀錄。'
      ],
      sections: [
        {
          heading: '用一般寄信工具邀請貴賓，你可能會遇到以下問題',
          bullets: [
            '名單在 Google Sheet、邀請表單在 Google Form、寄信在信箱，流程分散又難以回溯誰已寄出、誰尚未邀請',
            '貴賓回覆出席後，需要人工逐筆更新出席狀態與人數，統計目前確認人數相當費時',
            '活動前想發提醒信，既耗時、寄錯信的風險高'
          ]
        },
        {
          heading: 'INVITI 讓邀請與出席追蹤不再困難',
          body:
            '透過 INVITI，你可以在「貴賓出席名單」中直接完成邀請、確認與提醒三個步驟，並即時看到出席狀態與票數變化。從寄出第一封邀請信，到活動前夕確認最終人數，都在同一個介面完成，讓團隊隨時掌握活動最新出席進度。'
        }
      ],
      backLabel: '← 返回產品功能',
      moreFeaturesLabel: '其他產品功能'
    };
  }

  return {
    title: '貴賓資料庫',
    intro: [
      'INVITI 把所有公關貴賓整理成一個可以長期累積的「貴賓資料庫」，用「Email」當作唯一識別，避免重複建檔。你可以用單筆新增、批量匯入，或透過邀請表單自動同步活動中的新貴賓資料。',
      '欄位已預先依照公關情境設計（姓名、單位、職稱、聯絡方式、聯絡人、標籤等），再搭配標籤與內部窗口設定，讓每一位貴賓的背景、關係與互動脈絡都能被記錄下來，而不是只存在某一兩個同事的記憶裡。'
    ],
    sections: [
      {
        heading: '如果在Google Sheet或Excel管理貴賓總表，你可能會遇到以下問題',
        bullets: [
          '同一位貴賓在不同活動被重複建立多筆資料，名稱、職稱或聯絡方式不一致，難以判斷哪一筆才是最新',
          '名單散落在各種 Excel、Google 試算表與信箱附件中，新加入的同事很難快速掌握既有關係',
          '想依產業別、重要程度、邀請人或地區分組邀請時，只能一張張表格篩選、貼標記，時間花在整理資料，而不是經營關係',
          '活動結束後，無法從單一視角回頭查看這位貴賓「歷年參與紀錄」，也難以做後續關係維護與資料分析'
        ]
      },
      {
        heading: 'INVITI 讓貴賓資料變成可以長期累積的資產',
        body:
          '透過貴賓資料庫，所有貴賓資訊被集中在同一套系統中，由 Email 自動避免重複建檔，並可透過標籤、產業別、重要程度、邀請人等條件快速搜尋與分組。每次邀請與出席狀況也會回寫到同一筆貴賓資料，形成清楚的互動歷史。無論是新人接手、公關換人，或是跨部門需要共用名單，都能在同一個畫面看到完整且最新的貴賓關係全貌。'
      }
    ],
    backLabel: '← 返回產品功能',
    moreFeaturesLabel: '其他產品功能'
  };
}

export const FeatureContentPage: React.FC<FeatureContentPageProps> = ({
  featureId,
  isMobile = false,
  locale = 'tc',
  onBack,
  onNavigate
}) => {
  const t = getTranslations(locale);
  const content = getLocalizedContent(locale, featureId);
  const containerClass = isMobile ? 'container-fluid px-4' : 'container';
  const [isImageHovering, setIsImageHovering] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const allFeatures = [
    {
      id: 'event-session-management' as FeatureContentId,
      icon: <Calendar size={22} className="text-dark" />,
      title: t.features.card1Title,
      description: t.features.card1Description
    },
    {
      id: 'automated-invitations' as FeatureContentId,
      icon: <Mail size={22} className="text-dark" />,
      title: t.features.card2Title,
      description: t.features.card2Description
    },
    {
      id: 'guest-database' as FeatureContentId,
      icon: <Database size={22} className="text-dark" />,
      title: t.features.card3Title,
      description: t.features.card3Description
    }
  ];

  const relatedFeatures = allFeatures.filter((f) => f.id !== featureId);

  // When switching between feature pages, always scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [featureId]);

  return (
    <section className="section-padding bg-white border-top border-bottom">
      <div className={containerClass}>
        {onBack && (
          <button
            onClick={onBack}
            className="btn btn-link px-0 mb-4 text-muted small text-decoration-none"
          >
            {content.backLabel}
          </button>
        )}

        <div className="row g-4 mb-5">
          <div className="col-12 col-lg-6">
            <div className="bg-light border rounded overflow-hidden position-relative">
              {featureId === 'automated-invitations' ? (
                // YouTube video embed
                <div className="position-relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title={content.title}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                // Image/GIF with zoom button
                <div
                  onMouseEnter={() => setIsImageHovering(true)}
                  onMouseLeave={() => setIsImageHovering(false)}
                >
                  <img
                    src={imageMap[featureId]}
                    alt={content.title}
                    className="img-fluid w-100"
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Hover zoom button */}
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="btn btn-light btn-sm d-flex align-items-center gap-1 position-absolute"
                    style={{
                      right: '0.75rem',
                      bottom: '0.75rem',
                      opacity: isImageHovering ? 1 : 0,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column">
              <h1 className="mb-4">{content.title}</h1>
              {content.intro.map((p) => (
                <p key={p} className="text-muted mb-3">
                  {p}
                </p>
              ))}

              {content.sections.map((section, idx) => (
                <div key={`${section.heading}-${idx}`} className="mt-3">
                  <h2 className="h6 mb-2">{section.heading}</h2>
                  {section.body && (
                    <p className="text-muted mb-2">{section.body}</p>
                  )}
                  {section.bullets && (
                    <ul
                      className="text-muted mb-2 ps-3"
                      style={{ listStyleType: 'disc' }}
                    >
                      {section.bullets.map((item) => (
                        <li key={item} className="mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other feature cards */}
        <div className="border-top pt-4">
          <h3 className={isMobile ? 'h6 mb-3' : 'h5 mb-4'}>
            {content.moreFeaturesLabel}
          </h3>
          <div className="row g-4">
            {relatedFeatures.map((feature) => (
              <div key={feature.id} className="col-12 col-md-6">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  screenshot={screenshotMap[feature.id]}
                  onClick={() =>
                    onNavigate?.(`/features/${feature.id}`)
                  }
                  isMobile={isMobile}
                  learnMoreText={t.features.viewDetails}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Intro image lightbox - only for images/GIFs, not videos */}
      {isLightboxOpen && featureId !== 'automated-invitations' && (
        <ImageLightbox
          imageUrl={imageMap[featureId]}
          alt={content.title}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </section>
  );
};



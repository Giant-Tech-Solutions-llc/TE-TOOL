import { useState, useRef, useEffect } from 'react';
import { Upload, MessageSquare, X, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import RadioCard from '../components/RadioCard';
import ProgressBar from '../components/ProgressBar';
import { prepareUploadPhoto } from '../utils/image';

const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

const LOADING_MESSAGES = [
  'Analyzing your inputs…',
  'Scoring 40+ taper styles…',
  'Matching face shape to taper height…',
  'Calibrating for hair texture…',
  'Checking lifestyle alignment…',
  'Generating AI style previews…',
  'Ranking your top matches…',
  'Finalizing recommendations…',
  'Almost ready…',
];

const questions = [
  {
    key: 'faceShape',
    label: "What's your face shape?",
    hint: 'Pull your hair back and look straight into a mirror',
    options: [
      { value: 'round',   label: 'Round',   desc: 'Full cheeks, equal width & length' },
      { value: 'oval',    label: 'Oval',    desc: 'Longer than wide, balanced jaw' },
      { value: 'square',  label: 'Square',  desc: 'Strong jaw, defined corners' },
      { value: 'heart',   label: 'Heart',   desc: 'Wide forehead, narrow chin' },
      { value: 'diamond', label: 'Diamond', desc: 'Wide cheekbones, narrow jaw' },
    ],
  },
  {
    key: 'hairType',
    label: "What's your hair texture?",
    hint: 'How it looks when it air-dries without any product',
    options: [
      { value: 'straight', label: 'Straight', desc: 'Lies flat, no natural wave' },
      { value: 'wavy',     label: 'Wavy',     desc: 'S-shaped waves, moderate volume' },
      { value: 'curly',    label: 'Curly',    desc: 'Defined springy coils' },
      { value: 'coily',    label: 'Coily',    desc: 'Tight zig-zag or dense coil' },
    ],
  },
  {
    key: 'lifestyle',
    label: 'How would you describe your lifestyle?',
    hint: 'Shapes how your taper should look day-to-day',
    options: [
      { value: 'professional', label: 'Professional', desc: 'Office, meetings, formal settings' },
      { value: 'casual',       label: 'Casual',       desc: 'Relaxed everyday comfort' },
      { value: 'creative',     label: 'Creative',     desc: 'Bold looks, self-expression' },
      { value: 'athletic',     label: 'Athletic',     desc: 'Active, function-first style' },
    ],
  },
  {
    key: 'age',
    label: 'What is your age range?',
    hint: 'Helps calibrate style formality and trend fit',
    options: [
      { value: 'teen', label: 'Teen', desc: '13–19' },
      { value: '20s',  label: '20s',  desc: '20–29' },
      { value: '30s',  label: '30s',  desc: '30–39' },
      { value: '40s+', label: '40s+', desc: '40 and over' },
    ],
  },
  {
    key: 'maintenance',
    label: 'How much upkeep can you commit to?',
    hint: 'Determines taper height and how sharp the blend looks',
    options: [
      { value: 'low',    label: 'Low effort',  desc: 'Cut every 4–6 weeks, minimal styling' },
      { value: 'medium', label: 'Some effort', desc: 'Trim every 3–4 weeks, quick styling' },
      { value: 'high',   label: 'High effort', desc: 'Weekly touch-ups, full daily styling' },
    ],
  },
];

function LoadingView({ tab }) {
  const [msgIdx, setMsgIdx]     = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);
  const [progress, setProgress] = useState(4);

  // Fake progress: ease-out curve reaching ~87% over 36 s
  useEffect(() => {
    const DURATION = 36000;
    const MAX = 87;
    const start = Date.now();
    const t = setInterval(() => {
      const pct = Math.min((Date.now() - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - pct, 2);
      setProgress(Math.round(4 + eased * (MAX - 4)));
      if (pct >= 1) clearInterval(t);
    }, 400);
    return () => clearInterval(t);
  }, []);

  // Cycle messages with a brief fade-out/in
  useEffect(() => {
    const cycle = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
        setMsgVisible(true);
      }, 220);
    }, 3200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div
      className="tt-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-16) var(--space-4)',
        textAlign: 'center',
        minHeight: '60vh',
      }}
    >
      {/* Dual-ring spinner */}
      <div style={{ position: 'relative', width: '72px', height: '72px', marginBottom: 'var(--space-8)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid var(--border)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: 'var(--accent)',
          animation: 'tt-spin 900ms linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: '14px',
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'var(--text-tertiary)',
          animation: 'tt-spin 1.5s linear infinite reverse',
        }} />
      </div>

      <h3 style={{
        fontSize: 'var(--text-2xl)',
        fontWeight: 'var(--font-bold)',
        letterSpacing: '-0.02em',
        marginBottom: 'var(--space-3)',
      }}>
        Building your taper plan
      </h3>

      <p style={{
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-base)',
        marginBottom: 'var(--space-8)',
        minHeight: '1.6em',
        opacity: msgVisible ? 1 : 0,
        transition: 'opacity 180ms ease',
      }}>
        {LOADING_MESSAGES[msgIdx]}
      </p>

      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{
          width: '100%',
          height: '5px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: 'var(--space-2)',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--accent)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 600ms ease',
          }} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
        }}>
          <span>{tab === 'photo' ? 'AI face analysis + style previews' : 'Style matching + previews'}</span>
          <span>{progress}%</span>
        </div>
      </div>

      <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
        Typically takes 20–40 seconds
      </p>
    </div>
  );
}

export default function ToolInterface({ onSubmit, loading, error }) {
  const [tab, setTab]           = useState('photo');
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState({
    faceShape: null, hairType: null, lifestyle: null, age: null, maintenance: null,
  });
  const [photo, setPhoto]           = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [dragOver, setDragOver]     = useState(false);
  const [advancing, setAdvancing]   = useState(false);
  const advanceTimer = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);

  const handleFile = async (file) => {
    setPhotoError(null);
    if (!file) return;
    if (!file.type.startsWith('image/')) { setPhotoError('Please select an image file.'); return; }
    if (file.size > MAX_PHOTO_BYTES) { setPhotoError('Image must be under 10 MB.'); return; }
    try {
      const prepared = await prepareUploadPhoto(file);
      setPhoto({ name: file.name, size: prepared.size, type: prepared.mimeType, dataUrl: prepared.dataUrl, downscaled: prepared.downscaled });
    } catch { setPhotoError('Could not read this file.'); }
  };

  const handleQuizAnswer = (value) => {
    if (advancing) return;
    const key = questions[quizStep].key;
    const newData = { ...quizData, [key]: value };
    setQuizData(newData);
    setAdvancing(true);

    advanceTimer.current = setTimeout(() => {
      setAdvancing(false);
      if (quizStep < questions.length - 1) {
        setQuizStep(prev => prev + 1);
      } else {
        onSubmit({ type: 'quiz', data: newData });
      }
    }, 380);
  };

  const handleBack = () => {
    if (quizStep === 0) return;
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setAdvancing(false);
    setQuizStep(prev => prev - 1);
  };

  const switchTab = (t) => {
    setTab(t);
    setQuizStep(0);
    setQuizData({ faceShape: null, hairType: null, lifestyle: null, age: null, maintenance: null });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files && e.dataTransfer.files[0]);
  };

  if (loading) return <LoadingView tab={tab} />;

  return (
    <div className="tt-fade-in" style={{ maxWidth: '840px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>

      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          marginBottom: 'var(--space-3)',
          fontWeight: 'var(--font-bold)',
          letterSpacing: '-0.02em',
        }}>
          How would you like to get started?
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
          Upload a photo for the most accurate AI recommendations
        </p>
      </div>

      {/* Mode selector */}
      <div className="tt-mode-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: 'var(--space-4)',
        alignItems: 'stretch',
        marginBottom: 'var(--space-10)',
      }}>
        <button
          type="button"
          onClick={() => switchTab('photo')}
          className="tt-mode-btn"
          style={{
            padding: 'var(--space-5) var(--space-4)',
            border: `2px solid ${tab === 'photo' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'all var(--transition)',
            background: tab === 'photo' ? 'var(--bg-secondary)' : 'transparent',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2)',
            position: 'relative',
          }}
        >
          <span style={{
            position: 'absolute', top: 'var(--space-2)', right: 'var(--space-2)',
            padding: '2px 10px',
            background: 'var(--accent)', color: 'var(--bg-primary)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            Best
          </span>
          <Upload size={28} style={{ color: tab === 'photo' ? 'var(--accent)' : 'var(--text-secondary)' }} />
          <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>
            Upload Photo
          </span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            AI reads your face shape
          </span>
        </button>

        <div aria-hidden="true" style={{
          fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)',
          fontWeight: 'var(--font-semibold)', alignSelf: 'center',
        }}>
          OR
        </div>

        <button
          type="button"
          onClick={() => switchTab('quiz')}
          className="tt-mode-btn"
          style={{
            padding: 'var(--space-5) var(--space-4)',
            border: `2px solid ${tab === 'quiz' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'all var(--transition)',
            background: tab === 'quiz' ? 'var(--bg-secondary)' : 'transparent',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <MessageSquare size={28} style={{ color: tab === 'quiz' ? 'var(--accent)' : 'var(--text-secondary)' }} />
          <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>
            Quick Quiz
          </span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            5 questions, ~1 minute
          </span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div role="alert" style={{
          maxWidth: '720px', margin: '0 auto var(--space-6)',
          padding: 'var(--space-4)',
          background: 'var(--bg-secondary)', border: '1px solid var(--error)',
          borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
          fontSize: 'var(--text-base)', lineHeight: 1.5,
        }}>
          <strong style={{ color: 'var(--error)' }}>Heads up: </strong>{error}
        </div>
      )}

      {/* ── Photo tab ── */}
      {tab === 'photo' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${dragOver ? 'var(--accent-hover)' : photo ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: photo ? 'var(--space-8) var(--space-4)' : 'var(--space-12) var(--space-4)',
            textAlign: 'center',
            background: dragOver ? 'var(--bg-secondary)' : 'transparent',
            transition: 'all var(--transition)',
          }}
        >
          {!photo ? (
            <>
              <Upload size={48} style={{ margin: '0 auto var(--space-4)', color: 'var(--accent)', display: 'block' }} />
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
                Drop your photo here
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-base)' }}>
                A clear headshot works best — face forward, good lighting
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                onChange={(e) => handleFile(e.target.files && e.target.files[0])}
              />
              <Button size="lg" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                Choose Photo
              </Button>
              {photoError && (
                <p style={{ color: 'var(--error)', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                  {photoError}
                </p>
              )}
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-4)' }}>
                Never stored · Processed securely · Deleted after analysis
              </p>
            </>
          ) : (
            <>
              <div style={{ position: 'relative', maxWidth: '300px', margin: '0 auto var(--space-6)' }}>
                <img
                  src={photo.dataUrl}
                  alt="Your upload"
                  style={{ width: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', display: 'block' }}
                />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => { setPhoto(null); setPhotoError(null); }}
                  style={{
                    position: 'absolute', top: 'var(--space-2)', right: 'var(--space-2)',
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'var(--bg-primary)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-primary)', cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                {photo.name} · {(photo.size / 1024).toFixed(0)} KB
                {photo.downscaled && ' · optimized for upload'}
              </p>
              <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
                <Button
                  size="lg"
                  onClick={() => onSubmit({ type: 'photo', data: { ...quizData, photo: photo.dataUrl, mimeType: photo.type } })}
                >
                  Analyze My Photo
                </Button>
                <Button variant="ghost" size="lg" onClick={() => { setPhoto(null); setPhotoError(null); }}>
                  Choose Different
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Quiz tab ── */}
      {tab === 'quiz' && (
        <div>
          <ProgressBar current={quizStep + 1} total={questions.length} variant="dots" />

          <div key={quizStep} className="tt-fade-in" style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
                Question {quizStep + 1} of {questions.length}
              </p>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-semibold)',
                marginBottom: 'var(--space-2)',
                letterSpacing: '-0.01em',
              }}>
                {questions[quizStep].label}
              </h3>
              {questions[quizStep].hint && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                  {questions[quizStep].hint}
                </p>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
              gap: 'var(--space-3)',
              maxWidth: '720px',
              margin: '0 auto',
            }}>
              {questions[quizStep].options.map(option => (
                <RadioCard
                  key={option.value}
                  label={option.label}
                  desc={option.desc}
                  value={option.value}
                  selected={quizData[questions[quizStep].key] === option.value}
                  onChange={handleQuizAnswer}
                  advancing={advancing}
                />
              ))}
            </div>

            {quizStep > 0 && (
              <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
                <Button variant="ghost" size="sm" onClick={handleBack} icon={<ArrowLeft size={15} />}>
                  Back
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

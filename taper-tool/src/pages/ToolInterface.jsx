import { useState, useRef } from 'react';
import { Upload, MessageSquare, X, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import RadioCard from '../components/RadioCard';
import ProgressBar from '../components/ProgressBar';

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

export default function ToolInterface({ onSubmit, loading }) {
  const [tab, setTab] = useState('photo');
  const [quizData, setQuizData] = useState({
    faceShape: null,
    hairType: null,
    lifestyle: null,
    age: null,
    maintenance: null
  });
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const questions = [
    {
      key: 'faceShape',
      label: 'What is your face shape?',
      options: [
        { value: 'round', label: 'Round' },
        { value: 'oval', label: 'Oval' },
        { value: 'square', label: 'Square' },
        { value: 'heart', label: 'Heart' },
        { value: 'diamond', label: 'Diamond' }
      ]
    },
    {
      key: 'hairType',
      label: 'What is your hair type?',
      options: [
        { value: 'straight', label: 'Straight' },
        { value: 'wavy', label: 'Wavy' },
        { value: 'curly', label: 'Curly' },
        { value: 'coily', label: 'Coily' }
      ]
    },
    {
      key: 'lifestyle',
      label: 'What best describes your lifestyle?',
      options: [
        { value: 'professional', label: 'Professional' },
        { value: 'casual', label: 'Casual' },
        { value: 'creative', label: 'Creative' },
        { value: 'athletic', label: 'Athletic' }
      ]
    },
    {
      key: 'age',
      label: 'What is your age range?',
      options: [
        { value: 'teen', label: 'Teen' },
        { value: '20s', label: '20s' },
        { value: '30s', label: '30s' },
        { value: '40s+', label: '40s+' }
      ]
    },
    {
      key: 'maintenance',
      label: 'How much maintenance do you prefer?',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    }
  ];

  const currentQuestion = questions.findIndex(q => !quizData[q.key]);
  const isComplete = currentQuestion === -1;

  const handleFile = (file) => {
    setPhotoError(null);
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file.');
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError('Image must be under 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto({
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: e.target.result
      });
    };
    reader.onerror = () => setPhotoError('Could not read this file.');
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div
      className="tt-fade-in"
      style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          marginBottom: 'var(--space-4)',
          fontWeight: 'var(--font-bold)',
          letterSpacing: '-0.02em'
        }}>
          How would you like to get started?
        </h2>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)' }}>
          Upload your photo for the most accurate recommendations
        </p>
      </div>

      <div className="tt-mode-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: 'var(--space-4)',
        alignItems: 'center',
        marginBottom: 'var(--space-12)'
      }}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setTab('photo')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTab('photo'); } }}
          style={{
            padding: 'var(--space-8)',
            border: `3px solid ${tab === 'photo' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'all var(--transition)',
            background: tab === 'photo' ? 'var(--bg-secondary)' : 'transparent',
            textAlign: 'center',
            outline: 'none'
          }}
        >
          <Upload size={48} style={{ margin: '0 auto var(--space-4)', color: 'var(--accent)', display: 'block' }} />
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
            Upload Photo
          </h3>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
            Most accurate results
          </p>
          <div style={{
            display: 'inline-block',
            marginTop: 'var(--space-3)',
            padding: 'var(--space-1) var(--space-3)',
            background: 'var(--accent)',
            color: 'var(--bg-primary)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)'
          }}>
            Recommended
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-tertiary)',
            fontWeight: 'var(--font-semibold)',
            textAlign: 'center'
          }}
        >
          OR
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setTab('quiz')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTab('quiz'); } }}
          style={{
            padding: 'var(--space-8)',
            border: `2px solid ${tab === 'quiz' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'all var(--transition)',
            background: tab === 'quiz' ? 'var(--bg-secondary)' : 'transparent',
            textAlign: 'center',
            outline: 'none'
          }}
        >
          <MessageSquare size={48} style={{ margin: '0 auto var(--space-4)', color: 'var(--text-secondary)', display: 'block' }} />
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
            Take Quiz
          </h3>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
            5 quick questions
          </p>
        </div>
      </div>

      {tab === 'photo' && (
        <div>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            style={{
              border: `3px dashed ${dragOver ? 'var(--accent-hover)' : 'var(--accent)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-16) var(--space-4)',
              textAlign: 'center',
              background: 'var(--bg-secondary)',
              transition: 'all var(--transition)'
            }}
          >
            {!photo && (
              <>
                <Upload size={64} style={{ margin: '0 auto var(--space-6)', color: 'var(--accent)', display: 'block' }} />
                <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                  Upload Your Photo
                </h3>
                <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
                  Drag and drop or click to browse
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  onChange={(e) => handleFile(e.target.files && e.target.files[0])}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="tt-btn-primary"
                  style={{
                    display: 'inline-block',
                    background: 'var(--accent)',
                    color: 'var(--bg-primary)',
                    padding: 'var(--space-4) var(--space-8)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-semibold)',
                    border: 'none',
                    transition: 'all var(--transition)'
                  }}
                >
                  Choose Photo
                </button>
                {photoError && (
                  <p style={{
                    color: 'var(--error)',
                    marginTop: 'var(--space-4)',
                    fontSize: 'var(--text-sm)'
                  }}>
                    {photoError}
                  </p>
                )}
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-tertiary)', marginTop: 'var(--space-6)' }}>
                  Your photo is processed securely and never stored
                </p>
              </>
            )}

            {photo && (
              <div>
                <div style={{
                  position: 'relative',
                  maxWidth: '400px',
                  margin: '0 auto var(--space-6)'
                }}>
                  <img
                    src={photo.dataUrl}
                    alt="Your upload"
                    style={{
                      width: '100%',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      display: 'block'
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Remove photo"
                    onClick={() => { setPhoto(null); setPhotoError(null); }}
                    style={{
                      position: 'absolute',
                      top: 'var(--space-2)',
                      right: 'var(--space-2)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-6)'
                }}>
                  {photo.name} · {(photo.size / 1024).toFixed(0)} KB
                </p>
                <div style={{
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  justifyContent: 'center'
                }}>
                  <Button
                    size="lg"
                    loading={loading}
                    onClick={() => onSubmit({ type: 'photo', data: { ...quizData, photo: photo.dataUrl, mimeType: photo.type } })}
                  >
                    {loading ? 'Analyzing...' : 'Analyze My Photo'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => { setPhoto(null); setPhotoError(null); }}
                  >
                    Choose Different Photo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'quiz' && (
        <div>
          {!isComplete && (
            <>
              <ProgressBar current={currentQuestion + 1} total={questions.length} />
              <div style={{ marginTop: 'var(--space-8)' }}>
                <h3 style={{
                  marginBottom: 'var(--space-6)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-semibold)',
                  textAlign: 'center'
                }}>
                  {questions[currentQuestion].label}
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: 'var(--space-4)',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {questions[currentQuestion].options.map(option => (
                    <RadioCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      selected={quizData[questions[currentQuestion].key] === option.value}
                      onChange={(value) => setQuizData(prev => ({
                        ...prev,
                        [questions[currentQuestion].key]: value
                      }))}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {isComplete && (
            <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)' }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--space-4)',
                fontWeight: 'var(--font-semibold)'
              }}>
                All set! Ready to find your perfect taper?
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
                Our AI will analyze your answers and recommend the best styles for you.
              </p>
              <Button
                size="lg"
                loading={loading}
                onClick={() => onSubmit({ type: 'quiz', data: quizData })}
              >
                Get My Recommendations
              </Button>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuizData({ faceShape: null, hairType: null, lifestyle: null, age: null, maintenance: null })}
                >
                  Reset answers
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-8)',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Loader2 size={18} className="tt-spin" />
            <span>{tab === 'photo' ? 'Analyzing your photo and rendering previews…' : 'Building your matches and rendering previews…'}</span>
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
            This can take 20–40 seconds while the AI generates your styled images.
          </div>
        </div>
      )}
    </div>
  );
}

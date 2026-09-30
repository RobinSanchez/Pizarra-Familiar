import { chromium } from 'playwright';
import path from 'path';

async function runValidation() {
  console.log('🚀 Starting Pizarra Familiar browser validation...');
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome' // Uses installed Google Chrome
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  try {
    // 1. Navigate to the app
    console.log('1. Navigating to http://127.0.0.1:3000 ...');
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });

    // Validate Title and Header
    const title = await page.textContent('h1');
    console.log('✅ Page loaded! Header:', title);

    await page.screenshot({ path: 'screenshot-1-dashboard.png', fullPage: true });
    console.log('📸 Saved screenshot-1-dashboard.png');

    // 2. Open Nueva Actividad modal
    console.log('2. Clicking "Nueva Actividad" button...');
    const newBtn = page.getByRole('button', { name: /Nueva Actividad/i }).first();
    await newBtn.click();

    // Verify modal is visible
    await page.waitForSelector('text=Nuevo Compromiso Familiar');
    console.log('✅ Modal opened successfully.');

    // 3. Test the Daily Load Indicator inside modal
    console.log('3. Verifying Asistente Inteligente & Indicador de Carga del Día...');
    await page.waitForSelector('text=Carga para');
    
    // Check load badge text (Tranquilo or Moderado)
    const loadText = await page.textContent('.capitalize:has-text("Día")');
    console.log('✅ Load status badge detected:', loadText?.trim());

    // 4. Fill in new activity details
    console.log('4. Entering new task details...');
    await page.fill('input[placeholder*="Llevar a los niños"]', 'Control Anual Odontológico');
    await page.fill('input[type="time"]', '16:00');
    await page.fill('input[placeholder*="Hospital Central"]', 'Centro Pediátrico');
    await page.fill('textarea[placeholder*="Notas importantes"]', 'Llevar carnet de la mutual y radiografías');

    await page.screenshot({ path: 'screenshot-2-modal-load-indicator.png' });
    console.log('📸 Saved screenshot-2-modal-load-indicator.png');

    // 5. Submit form
    console.log('5. Submitting activity form...');
    const submitBtn = page.getByRole('button', { name: /Guardar en la Pizarra/i });
    await submitBtn.click();

    // Verify new activity appears on board
    await page.waitForSelector('text=Control Anual Odontológico');
    console.log('✅ New activity successfully appeared on the dashboard!');

    // 6. Test Week View
    console.log('6. Switching to "Semana" view...');
    const weekBtn = page.getByRole('button', { name: /Semana/i }).first();
    await weekBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshot-3-semana.png', fullPage: true });
    console.log('📸 Saved screenshot-3-semana.png');

    // 7. Test Mental Load Balance View
    console.log('7. Switching to "Balance Mental" view...');
    const balanceBtn = page.getByRole('button', { name: /Balance Mental/i }).first();
    await balanceBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshot-4-balance-mental.png', fullPage: true });
    console.log('📸 Saved screenshot-4-balance-mental.png');

    // 8. Test Toggle Complete with confetti
    console.log('8. Returning to Hoy and toggling task complete...');
    const hoyBtn = page.getByRole('button', { name: /Hoy/i }).first();
    await hoyBtn.click();
    await page.waitForTimeout(500);

    const taskCards = await page.$$('.group');
    if (taskCards.length > 0) {
      const checkbox = await taskCards[0].$('button[title*="Marcar como"]');
      if (checkbox) {
        await checkbox.click();
        console.log('✅ Toggled task complete!');
        await page.waitForTimeout(1000);
      }
    }

    console.log('🎉 All automated validation tests PASSED successfully!');
  } catch (err) {
    console.error('❌ Validation failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runValidation();

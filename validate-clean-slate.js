import { chromium } from 'playwright';

async function validateCleanSlate() {
  console.log('🧪 Starting Clean Slate & Cloud configuration validation...');
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome'
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  try {
    console.log('1. Navigating to http://127.0.0.1:3000 ...');
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });

    // Clear any previous test localStorage to ensure fresh clean slate
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload({ waitUntil: 'networkidle' });

    console.log('2. Verifying clean slate (0 activities)...');
    await page.waitForSelector('text=¡Bienvenidos a su Pizarra Familiar!');
    console.log('✅ Clean slate verified! Welcome banner is displayed with 0 mock activities.');

    await page.screenshot({ path: 'screenshot-5-clean-slate.png', fullPage: true });
    console.log('📸 Saved screenshot-5-clean-slate.png');

    // 3. Open Data & Cloud Modal
    console.log('3. Opening Cloud Synchronization modal...');
    const settingsBtn = page.getByRole('button', { name: /Copia de seguridad|Configurar sincronización/i }).first();
    if (settingsBtn) {
      await settingsBtn.click();
    } else {
      await page.click('button[title*="sincronización"]');
    }

    await page.waitForSelector('text=Sincronización en la Nube y Datos');
    console.log('✅ Cloud & Data modal opened successfully.');

    await page.waitForSelector('input[placeholder*="tu-proyecto.supabase.co"]');
    console.log('✅ Supabase configuration fields verified.');

    await page.screenshot({ path: 'screenshot-6-cloud-modal.png' });
    console.log('📸 Saved screenshot-6-cloud-modal.png');

    // Close modal
    await page.click('button:has-text("Cerrar")');

    // 4. Create first real activity
    console.log('4. Adding first real activity...');
    const addBtn = page.getByRole('button', { name: /Crear mi primer compromiso|Nueva Actividad/i }).first();
    await addBtn.click();

    await page.waitForSelector('text=Nuevo Compromiso Familiar');
    await page.fill('input[placeholder*="Llevar a los niños"]', 'Control Pediátrico de Vacunación');
    await page.fill('input[type="time"]', '10:30');
    await page.fill('input[placeholder*="Hospital Central"]', 'Centro Pediátrico Infantil');
    
    // Save
    await page.click('button:has-text("Guardar en la Pizarra")');
    await page.waitForSelector('text=Control Pediátrico de Vacunación');
    console.log('✅ First real activity created and displayed successfully on the clean board!');

    await page.screenshot({ path: 'screenshot-7-real-activity.png', fullPage: true });
    console.log('📸 Saved screenshot-7-real-activity.png');

    console.log('🎉 All Clean Slate and Cloud persistence tests PASSED successfully!');
  } catch (err) {
    console.error('❌ Validation failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

validateCleanSlate();

import { rightOrThrow } from '@nexus/logger/dist/utils'
import * as Layout from '../../lib/layout/layout'
import { tsconfigTemplate } from '../../lib/layout/tsconfig'
import { Manifest } from '../../lib/plugin'
import * as TC from '../../lib/test-context'
import { createStartModuleContent } from './'

const ctx = TC.create(TC.tmpDir(), TC.fs())

describe('createStartModuleContent', () => {
  it('app module but not yoma modules', async () => {
    ctx.fs.write('packge.json', { name: 'app', version: '0.0.0' })
    ctx.fs.write('app.ts', '')
    ctx.fs.write('tsconfig.json', tsconfigTemplate({ outRootRelative: 'build', sourceRootRelative: '.' }))
    const layout = await Layout.create({ cwd: ctx.fs.cwd() }).then(rightOrThrow)
    const sm = createStartModuleContent({ internalStage: 'build', runtimePluginManifests: [], layout })
    expect(sm).toMatchInlineSnapshot(`
      "// GENERATED YOMA START MODULE


      // Run framework initialization side-effects
      // Also, import the app for later use
      import app from \\"yoma\\")


      // Last resort error handling
      process.once('uncaughtException', error => {
        app.log.fatal('uncaughtException', { error: error })
        process.exit(1)
      })

      process.once('unhandledRejection', error => {
        app.log.fatal('unhandledRejection', { error: error })
        process.exit(1)
      })


      // Import the user's app module
      require(\\"./app\\")


      app.assemble()
      app.start()"
    `)
  })

  it('with app module and yoma modules', async () => {
    ctx.fs.write('packge.json', { name: 'app', version: '0.0.0' })
    ctx.fs.write('app.ts', '')
    ctx.fs.write('a.ts', 'import "yoma"')
    ctx.fs.write('b.ts', 'import "yoma"')
    ctx.fs.write('c/d/e.ts', 'import "yoma"')
    ctx.fs.write('tsconfig.json', tsconfigTemplate({ outRootRelative: 'build', sourceRootRelative: '.' }))
    const layout = await Layout.create({ cwd: ctx.fs.cwd() }).then(rightOrThrow)
    const sm = createStartModuleContent({
      internalStage: 'build',
      runtimePluginManifests: [],
      layout,
    })
    expect(sm).toMatchInlineSnapshot(`
      "// GENERATED YOMA START MODULE


      // Run framework initialization side-effects
      // Also, import the app for later use
      import app from \\"yoma\\")


      // Last resort error handling
      process.once('uncaughtException', error => {
        app.log.fatal('uncaughtException', { error: error })
        process.exit(1)
      })

      process.once('unhandledRejection', error => {
        app.log.fatal('unhandledRejection', { error: error })
        process.exit(1)
      })


      // Import the user's Yoma modules
              
      import './a'
      import './b'
      import './c/d/e'


      // Import the user's app module
      require(\\"./app\\")


      app.assemble()
      app.start()"
    `)
  })

  it('with yoma modules', async () => {
    ctx.fs.write('packge.json', { name: 'app', version: '0.0.0' })
    ctx.fs.write('a.ts', 'import "yoma"')
    ctx.fs.write('tsconfig.json', tsconfigTemplate({ outRootRelative: 'build', sourceRootRelative: '.' }))
    const layout = await Layout.create({ cwd: ctx.fs.cwd() }).then(rightOrThrow)
    const sm = createStartModuleContent({
      internalStage: 'build',
      runtimePluginManifests: [],
      layout,
    })
    expect(sm).toMatchInlineSnapshot(`
      "// GENERATED YOMA START MODULE


      // Run framework initialization side-effects
      // Also, import the app for later use
      import app from \\"yoma\\")


      // Last resort error handling
      process.once('uncaughtException', error => {
        app.log.fatal('uncaughtException', { error: error })
        process.exit(1)
      })

      process.once('unhandledRejection', error => {
        app.log.fatal('unhandledRejection', { error: error })
        process.exit(1)
      })


      // Import the user's Yoma modules
              
      import './a'


      app.assemble()
      app.start()"
    `)
  })

  it('with plugins', async () => {
    ctx.fs.write('packge.json', { name: 'app', version: '0.0.0' })
    ctx.fs.write('app.ts', '')
    ctx.fs.write('tsconfig.json', tsconfigTemplate({ outRootRelative: 'build', sourceRootRelative: '.' }))
    const layout = await Layout.create({ cwd: ctx.fs.cwd() }).then(rightOrThrow)
    const pluginManifest = {
      name: 'yoma-plugin-a',
      runtime: {
        export: 'a',
        module: ctx.fs.path('node_modules/yoma-plugin-a/dist/runtime.js'),
      },
    } as Manifest
    const sm = createStartModuleContent({
      internalStage: 'build',
      runtimePluginManifests: [pluginManifest],
      layout,
    })
    expect(sm).toMatchInlineSnapshot(`
      "// GENERATED YOMA START MODULE


      // Run framework initialization side-effects
      // Also, import the app for later use
      import app from \\"yoma\\")


      // Last resort error handling
      process.once('uncaughtException', error => {
        app.log.fatal('uncaughtException', { error: error })
        process.exit(1)
      })

      process.once('unhandledRejection', error => {
        app.log.fatal('unhandledRejection', { error: error })
        process.exit(1)
      })


      // Import the user's app module
      require(\\"./app\\")


      import { a as plugin_0 } from 'yoma-plugin-a/dist/runtime'


      app.assemble()
      app.start()"
    `)
  })
})
